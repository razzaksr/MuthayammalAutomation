use mec_automation;
-- select subtype_id,is_eve_completed from data_ecr_workshop where is_eve_completed=null;
-- to show waiting for level1 aprrovals workshops
-- select workshop_id from data_ecr_workshop where dept_id=1 and eve_status=0;
-- select approval_id,report_lvl1 from data_approvals where subtype_id=1901 and report_lvl1 like '%6001%';
-- select approval_id,report_lvl1 from data_approvals where subtype_id=1901 and dept_id = 1;

-- SELECT column_name
-- FROM information_schema.columns
-- WHERE table_schema = 'mec_automation' -- Replace with your actual database name
--   AND table_name = 'data_approvals'
--   AND is_nullable = 'NO';

-- SELECT COLUMN_NAME
-- FROM INFORMATION_SCHEMA.COLUMNS
-- WHERE TABLE_NAME = 'data_approvals'
--   AND TABLE_SCHEMA = 'mec_automation'
--   AND COLUMN_NAME IN (
--     SELECT COLUMN_NAME
--     FROM data_approvals
--     WHERE COLUMN_NAME IS NOT NULL and dept_id=1
--   );

-- SELECT COLUMN_NAME
-- FROM INFORMATION_SCHEMA.COLUMNS
-- WHERE TABLE_NAME = 'data_approvals'
--   AND TABLE_SCHEMA = 'mec_automation'
--   AND (
--     SELECT COUNT(*)
--     FROM data_approvals
--     WHERE COLUMN_NAME IS NOT NULL and dept_id=1
--   ) > 0;



-- SELECT workshop_id, 
--        CASE 
--          WHEN report_lvl1 like '%6001%' THEN '6001' 
--          WHEN report_lvl2 like '%6001%' THEN '6001'
--          WHEN report_lvl3 like '%6001%' THEN '6001'
--          WHEN report_lvl4 like '%6001%' THEN '6001'
--          WHEN report_lvl5 like '%6001%' THEN '6001' 
--          ELSE NULL 
--        END AS level 
-- FROM 
-- WHERE '6001' IN (report_lvl1,report_lvl2,report_lvl3,report_lvl4,report_lvl5);

-- select * from data_approvals where dept_id=1;


-- find the non null approvals of the respective dept
-- SELECT dept_id, 'report_lvl1' AS column_name, report_lvl1 AS column_value
-- FROM data_approvals
-- WHERE dept_id = 1 AND report_lvl1 IS NOT NULL
-- UNION ALL
-- SELECT dept_id, 'report_lvl2' AS column_name, report_lvl2 AS column_value
-- FROM data_approvals
-- WHERE dept_id = 1 AND report_lvl2 IS NOT NULL
-- UNION ALL
-- SELECT dept_id, 'report_lvl3' AS column_name, report_lvl3 AS column_value
-- FROM data_approvals
-- WHERE dept_id = 1 AND report_lvl3 IS NOT NULL
-- UNION ALL
-- SELECT dept_id, 'report_lvl4' AS column_name, report_lvl4 AS column_value
-- FROM data_approvals
-- WHERE dept_id = 1 AND report_lvl4 IS NOT NULL
-- UNION ALL
-- SELECT dept_id, 'report_lvl5' AS column_name, report_lvl5 AS column_value
-- FROM data_approvals
-- WHERE dept_id = 1 AND report_lvl5 IS NOT NULL

-- DELIMITER //

-- CREATE PROCEDURE GetNonNullColumnsForDeptId(IN p_dept_id INT)
-- BEGIN
--     SELECT p_dept_id AS dept_id, 'report_lvl1' AS column_name, report_lvl1 AS column_value
--     FROM data_approvals
--     WHERE p_dept_id = dept_id AND report_lvl1 IS NOT NULL
--     UNION ALL
--     SELECT p_dept_id AS dept_id, 'report_lvl2' AS column_name, report_lvl2 AS column_value
--     FROM data_approvals
--     WHERE p_dept_id = dept_id AND report_lvl2 IS NOT NULL
--     UNION ALL
--     SELECT p_dept_id AS dept_id, 'report_lvl3' AS column_name, report_lvl3 AS column_value
--     FROM data_approvals
--     WHERE p_dept_id = dept_id AND report_lvl3 IS NOT NULL
--     UNION ALL
--     SELECT p_dept_id AS dept_id, 'report_lvl4' AS column_name, report_lvl4 AS column_value
--     FROM data_approvals
--     WHERE p_dept_id = dept_id AND report_lvl4 IS NOT NULL
--     UNION ALL
--     SELECT p_dept_id AS dept_id, 'report_lvl5' AS column_name, report_lvl5 AS column_value
--     FROM data_approvals
--     WHERE p_dept_id = dept_id AND report_lvl5 IS NOT NULL;
-- END//

-- DELIMITER ;

-- call GetNonNullColumnsForDeptId(1);



-- DELIMITER //

-- CREATE PROCEDURE UpdatingOnes(IN p_dept_id INT, in levels varchar(255), in employee int)
-- BEGIN
--     update data_ecr_workshop set levels = employee where dept_id=p_dept_id;
-- END//

-- DELIMITER ;

-- start transaction;

-- call UpdatingOnes(1,'report_lvl1',6001);
-- drop procedure UpdatingOnes;

-- select count(*) from data_approvals where dept_id=5 and (not report_lvl1 is null or not report_lvl2 is null or not report_lvl3 is null or not report_lvl5 is null or not report_lvl4 is null);

-- DELIMITER //

-- CREATE PROCEDURE CountNonNullLevelColumnsForDeptId(IN p_dept_id INT, OUT p_count INT)
-- BEGIN
--     DECLARE non_null_count INT DEFAULT 0;

--     IF p_dept_id IS NOT NULL THEN
--         -- Check and count non-null values for level1
--         SELECT COUNT(*) INTO non_null_count
--         FROM data_approvals
--         WHERE dept_id = p_dept_id AND report_lvl1 IS NOT NULL;

--         -- Check and count non-null values for level2
--         SELECT COUNT(*) INTO non_null_count
--         FROM data_approvals
--         WHERE dept_id = p_dept_id AND report_lvl2 IS NOT NULL;

--         -- Check and count non-null values for level3
--         SELECT COUNT(*) INTO non_null_count
--         FROM data_approvals
--         WHERE dept_id = p_dept_id AND report_lvl3 IS NOT NULL;
--         
--         -- Check and count non-null values for level4
--         SELECT COUNT(*) INTO non_null_count
--         FROM data_approvals
--         WHERE dept_id = p_dept_id AND report_lvl4 IS NOT NULL;
--         
--         -- Check and count non-null values for level5
--         SELECT COUNT(*) INTO non_null_count
--         FROM data_approvals
--         WHERE dept_id = p_dept_id AND report_lvl5 IS NOT NULL;
--     END IF;

--     SET p_count = non_null_count;
-- END //

-- DELIMITER ;

-- Declare variables to hold the department ID and the count

-- declare @count INT;

-- drop procedure CountNonNullLevelColumnsForDeptId;

-- -- Set the department ID you want to count non-null level columns for
-- SET @dept_id = 1;  -- Replace with your desired department ID

-- -- Call the procedure and pass the department ID and output parameter for the count
-- CALL CountNonNullLevelColumnsForDeptId(1, @count);
-- SELECT @count AS non_null_level_columns_count;

-- -- Display the count
-- SELECT @count AS non_null_level_columns_count;



update data_ecr_workshop set is_eve_completed=1 where dept_id=? and eve_status=?