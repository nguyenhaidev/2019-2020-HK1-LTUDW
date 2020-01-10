DROP PROCEDURE IF EXISTS `sp_purchase_product`;
CREATE PROCEDURE `sp_purchase_product`(
    IN __product_id INT,
    IN __account_id INT
)
sp_purchase_product_exit: BEGIN
    SELECT @purchase_price := purchase_price
    FROM af_product
    WHERE product_id = __product_id;

    CALL sp_allow_bid(__product_id, __account_id, @purchase_price, @output);

    IF (@output = 0) THEN
        LEAVE sp_purchase_product_exit;
    END IF;

    CALL sp_bid_product(__product_id, __account_id, @purchase_price);

    UPDATE af_product
    SET won_bidder = __account_id
    WHERE product_id = __product_id;
END;

DROP PROCEDURE IF EXISTS `sp_allow_bid`;
CREATE PROCEDURE `sp_allow_bid`(
    IN __product_id INT, 
    IN __account_id INT,
    IN __price DECIMAL,
    OUT __result BIT
)
sp_allow_bid_exit: BEGIN
    SET __result := 0;

    IF (NULL = (
        SELECT won_bidder
        FROM af_product
        WHERE product_id = __product_id
    )) THEN
        LEAVE sp_allow_bid_exit;
    END IF;

    IF (0.8 > (
        SELECT GREATEST(upvote, 1) / (GREATEST(upvote, 1) + downvote)
        FROM af_account
        WHERE account_id = __account_id
    )) THEN
        LEAVE sp_allow_bid_exit;
    END IF;

    IF (__price <= (
            SELECT highest_price FROM af_product
            WHERE product_id = __product_id)
    ) THEN
        LEAVE sp_allow_bid_exit;
    END IF;

    SET __result := 1;
END;

DROP PROCEDURE IF EXISTS `sp_bid_product`;
CREATE PROCEDURE `sp_bid_product`(
    IN __product_id INT, 
    IN __account_id INT,
    IN __price DECIMAL
)
sp_bid_product_exit: BEGIN

    CALL sp_allow_bid(__product_id, __account_id, __price, @output);

    IF (@output = 0) THEN
        LEAVE sp_bid_product_exit;
    END IF;

    INSERT INTO af_history
    VALUES (0, __account_id, __product_id, __price, UTC_TIMESTAMP());

    UPDATE af_product
    SET highest_price = __price,
        highest_bidder = __account_id
    WHERE product_id = __product_id;
END;

DROP PROCEDURE IF EXISTS `sp_get_most_offer_count`;
CREATE PROCEDURE `sp_get_most_offer_count`()
BEGIN
    SELECT p.*, a.fullname AS bidder_name, COUNT(1) AS offer_count
    FROM af_product p 
    JOIN af_account a 
        ON a.account_id = p.owner_id
    LEFT JOIN af_history h 
        ON h.product_id = p.product_id
    GROUP BY p.product_id
    ORDER BY COUNT(1) DESC
    LIMIT 5;
END;

DROP PROCEDURE IF EXISTS `sp_get_most_highest_price`;
CREATE PROCEDURE `sp_get_most_highest_price`()
BEGIN
    SELECT p.*, a.fullname AS bidder_name, COUNT(1) AS offer_count
    FROM af_product p 
    JOIN af_account a ON a.account_id = p.owner_id
    LEFT JOIN af_history h ON h.product_id = p.product_id
    GROUP BY p.product_id
    ORDER BY p.highest_price DESC
    LIMIT 5;
END;

DROP PROCEDURE IF EXISTS `sp_get_most_ending_soon`;
CREATE PROCEDURE `sp_get_most_ending_soon`()
BEGIN
    SELECT p.*, a.fullname AS bidder_name, COUNT(1) AS offer_count
    FROM af_product p 
    JOIN af_account a ON a.account_id = p.owner_id
    LEFT JOIN af_history h ON h.product_id = p.product_id
    GROUP BY p.product_id
    ORDER BY p.end_date DESC
    LIMIT 5;
END;

DROP PROCEDURE IF EXISTS `sp_count_bidder`;
CREATE PROCEDURE `sp_count_bidder`(
    IN __product_id INT
)
BEGIN
    SELECT COUNT(1)
    FROM af_history ah
    WHERE ah.product_id = __product_id;
END;

DROP PROCEDURE IF EXISTS `sp_get_history`;
CREATE PROCEDURE `sp_get_history`(
    IN __product_id INT,
    IN __offset INT
)
BEGIN
    SELECT acc.fullname, his.*
    FROM af_history his
    JOIN  af_account acc ON acc.account_id = his.account_id
    WHERE his.product_id = __product_id
    ORDER BY price DESC
    LIMIT 12 OFFSET __offset;
END;

SELECT p.*, a.fullname AS bidder_name, COUNT(product_id) AS offer_count
FROM af_product p 
JOIN af_account a ON a.account_id = p.owner_id
WHERE MATCH (p.product_name) 
    AGAINST ('nike' IN NATURAL LANGUAGE MODE)
GROUP BY p.product_id
ORDER BY p.highest_price DESC

DROP PROCEDURE IF EXISTS `sp_search_product`;
CREATE PROCEDURE `sp_search_product`(
    IN __keyword VARCHAR(255),
    IN __catid INT,
    IN __offset INT
)
BEGIN
    IF (__catid = 0) THEN
        SELECT p.*, a.fullname AS bidder_name, COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        WHERE MATCH (p.product_name) 
            AGAINST ('__keyword' IN NATURAL LANGUAGE MODE)
        GROUP BY p.product_id
        ORDER BY p.highest_price DESC
        LIMIT 12 OFFSET __offset;
    ELSE
        SELECT p.*, a.fullname AS bidder_name, COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        WHERE MATCH (p.product_name) 
            AGAINST (__keyword IN NATURAL LANGUAGE MODE)
            AND p.category_id = __catid
        GROUP BY p.product_id
        ORDER BY p.highest_price DESC
        LIMIT 12 OFFSET __offset;
    END IF;
END;

DROP PROCEDURE IF EXISTS `sp_ban_bidder`;
CREATE PROCEDURE `sp_ban_bidder`(
    IN __product_id INT,
    IN __bidder_id INT
)
sp_ban_bidder_exit: BEGIN
    IF EXISTS (
        SELECT 1 FROM af_ban
        WHERE product_id = __product_id
        AND bidder_id = __bidder_id
    ) THEN
        UPDATE af_ban
        SET is_banned = 1
        WHERE product_id = __product_id
        AND bidder_id = __bidder_id;
        LEAVE sp_ban_bidder_exit;
    END IF;

    INSERT INTO af_ban
    VALUES (__product_id, __bidder_id, UTC_TIMESTAMP(), 1);
END;

DROP PROCEDURE IF EXISTS `sp_bidding_products`;
CREATE PROCEDURE `sp_bidding_products`(IN __account_id INT)
BEGIN
    SELECT @current := UTC_TIMESTAMP();

    SELECT DISTINCT(his.product_id), pd.*, ac.fullname
    FROM af_product pd
    JOIN af_history his ON his.product_id = pd.product_id
    JOIN af_account ac ON ac.account_id = __account_id
    WHERE his.account_id = __account_id
        AND pd.end_date >= @current;
END;

DROP PROCEDURE IF EXISTS `sp_up_vote`;
CREATE PROCEDURE `sp_up_vote`(
    IN __owner_id INT,
    IN __voted_id INT
)
sp_up_vote_exit: BEGIN
    IF (__owner_id = __voted_id) THEN
        LEAVE sp_up_vote_exit;
    END IF;

    IF EXISTS (
        SELECT 1 FROM af_vote
        WHERE owner_id = __owner_id
        AND account_id = __voted_id
    ) THEN
        UPDATE af_vote
        SET vote_point = 1
        WHERE owner_id = __owner_id
        AND account_id = __voted_id;
    ELSE
        INSERT INTO af_vote
        VALUES (__owner_id, __voted_id, 1);
    END IF;
END;

DROP PROCEDURE IF EXISTS `sp_down_vote`;
CREATE PROCEDURE `sp_down_vote`(
    IN __owner_id INT,
    IN __voted_id INT
)
sp_down_vote_exit: BEGIN
    IF (__owner_id = __voted_id) THEN
        LEAVE sp_down_vote_exit;
    END IF;

    IF EXISTS (
        SELECT 1 FROM af_vote
        WHERE owner_id = __owner_id
        AND account_id = __voted_id
    ) THEN
        UPDATE af_vote
        SET vote_point = -1
        WHERE owner_id = __owner_id
        AND account_id = __voted_id;
    ELSE
        INSERT INTO af_vote
        VALUES (__owner_id, __voted_id, -1);
    END IF;
END;

DROP TRIGGER IF EXISTS `tg_insert_vote`;
CREATE TRIGGER `tg_insert_vote`
BEFORE INSERT
ON af_vote 
FOR EACH ROW BEGIN
    IF (NEW.vote_point = 1) THEN
        UPDATE af_account
        SET upvote = upvote + 1
        WHERE account_id = NEW.account_id;
    ELSE
        UPDATE af_account
        SET downvote = downvote + 1
        WHERE account_id = NEW.account_id;
    END IF;
END;

DROP TRIGGER IF EXISTS `tg_update_vote`;
CREATE TRIGGER `tg_update_vote`
AFTER UPDATE
ON af_vote
FOR EACH ROW BEGIN
    IF (OLD.vote_point <> NEW.vote_point) THEN
        UPDATE af_account
        SET upvote = upvote + NEW.vote_point,
            downvote = downvote - NEW.vote_point
        WHERE account_id = NEW.account_id;
    END IF;
END;

DROP PROCEDURE IF EXISTS `sp_new_request`;
CREATE PROCEDURE `sp_new_request`(
    IN __account_id INT
)
BEGIN
    INSERT INTO af_seller_request(request_id, account_id, finish_flag, request_date)
    VALUES (0, __account_id, 0, UTC_TIMESTAMP());
END;