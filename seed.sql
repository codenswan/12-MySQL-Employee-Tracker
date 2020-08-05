INSERT INTO departments
    (name)
VALUES
    ('engineering'),
    ('finance'),
    ('legal'),
    ('sales');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('lead software engineer', 150000, 1),
    ('software engineer', 80000, 1),
    ('accountant', 65000, 2),
    ('solicitor', 100000, 3),
    ('legal assistant', 60000, 3),
    ('sales associate', 55000, 4),
    ('lead sales', 68000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Winston", "Jones", 1, NULL),
    ("Monica", "Smith", 2, NULL),
    ("Samwise", "Gamgee", 5, 4),
    ("Tom", "Bombadil", 6, 7);