-- Insert sample data into Administrators table
INSERT INTO Administrators (Password) VALUES
('1'),
('2'),
('3'),
('4'),
('5'),
('6'),
('7'),
('8'),
('9'),
('10'),
('11'),
('12'),
('13'),
('14'),
('15');

-- Insert sample data into Students table
INSERT INTO Students (Name, DateOfBirth, Email, Phone) VALUES
('John', '2000-05-12', 'john@email.com', '1234567890'),
('Jane', '2001-08-20', 'jane@email.com', '2345678901'),
('Michael', '2003-11-15', 'michael@email.com', '3456789012'),
('Emily', '2002-02-25', 'emily@email.com', '4567890123'),
('James', '2001-03-10', 'james@email.com', '5678901234'),
('Patricia', '2001-07-30', 'patricia@email.com', '6789012345'),
('Robert', '2002-05-06', 'robert@email.com', '7890123456'),
('Taylor', '2000-12-11', 'linda@email.com', '8901234567'),
('William', '2002-04-18', 'william@email.com', '9012345678'),
('David', '2004-01-03', 'david@email.com', '0123456789'),
('Susan', '2005-09-21', 'susan@email.com', '1234509876'),
('Joseph', '2005-11-12', 'joseph@email.com', '2345612345'),
('Sarah', '2003-12-05', 'sarah@email.com', '3456723456'),
('Daniel', '2002-06-20', 'daniel@email.com', '4567834567'),
('Jessica', '2001-02-27', 'jessica@email.com', '5678945678');

-- Insert sample data into Courses table
INSERT INTO Courses (CourseName, Section, Credits) VALUES
('Introduction to Programming', 1, 3),
('Introduction to Programming', 2, 3),
('Data Structures', 1, 3),
('Data Structures', 2, 3),
('Database Management Systems', 1, 3),
('Database Management Systems', 2, 3),
('Operating Systems', 1, 3),
('Operating Systems', 2, 3),
('Software Engineering', 1, 3),
('Software Engineering', 2, 3),
('Artificial Intelligence', 1, 3),
('Artificial Intelligence', 2, 3),
('Machine Learning', 1, 3),
('Machine Learning', 2, 3),
('Computer Networks', 1, 3);

-- Insert sample data into Enrollments table
INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) VALUES
(1, 1, '2024-08-25'),
(2, 1, '2024-08-26'),
(3, 2, '2024-08-27'),
(4, 2, '2024-08-28'),
(5, 3, '2024-08-29'),
(6, 3, '2024-08-30'),
(7, 4, '2024-09-01'),
(8, 4, '2024-09-02'),
(9, 5, '2024-09-03'),
(10, 5, '2024-09-04'),
(11, 6, '2024-09-05'),
(12, 6, '2024-09-06'),
(13, 7, '2024-09-07'),
(14, 7, '2024-09-08'),
(15, 8, '2024-09-09');

-- Insert sample data into Grades table
INSERT INTO Grades (EnrollmentID, Grade, GradingDate) VALUES
(1, 'A+', '2024-12-01'),
(2, 'B', '2024-12-02'),
(3, 'A-', '2024-12-03'),
(4, 'C', '2024-12-04'),
(5, 'C', '2024-12-05'),
(6, 'A', '2024-12-06'),
(7, 'B+', '2024-12-07'),
(8, 'C', '2024-12-08'),
(9, 'A+', '2024-12-09'),
(10, 'B', '2024-12-10'),
(11, 'A+', '2024-12-11'),
(12, 'B', '2024-12-12'),
(13, 'A', '2024-12-13'),
(14, 'C', '2024-12-14'),
(15, 'B+', '2024-12-15');
