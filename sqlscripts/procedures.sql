
DROP PROCEDURE IF EXISTS `sp_bid_product`;
CREATE PROCEDURE `sp_bid_product`(
    IN __product_id INT, 
    IN __account_id INT,
    IN __price DECIMAL
)
sp_bid_product_exit: BEGIN
    DECLARE __up_vote_rate INT DEFAULT(0);
    DECLARE __current_price DECIMAL DEFAULT(0);

    SELECT __up_vote_rate = upvote / (upvote + downvote)
    FROM af_account
    WHERE account_id = __account_id;

    IF (__up_vote_rate < 0.8) THEN
        LEAVE sp_bid_product_exit;
    END IF;

    SELECT __current_price = highest_price
    FROM af_product
    WHERE product_id = __product_id;

    IF (__current_price <= __price) THEN
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
    SELECT acc.fullname, his.price, his.creation_date
    FROM af_history his
    JOIN  af_account acc ON acc.account_id = his.account_id
    WHERE his.product_id = __product_id
    ORDER BY price DESC
    LIMIT 10 OFFSET __offset ;
END;

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
            AGAINST (__keyword IN NATURAL LANGUAGE MODE)
        GROUP BY p.product_id
        ORDER BY p.highest_price DESC
        LIMIT 10 OFFSET __offset;
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
        LIMIT 10 OFFSET __offset;
    END IF;
END;