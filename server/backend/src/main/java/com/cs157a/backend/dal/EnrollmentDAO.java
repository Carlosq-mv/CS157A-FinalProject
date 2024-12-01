package com.cs157a.backend.dal;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cs157a.backend.config.DBConnection;
import com.cs157a.backend.dto.EnrollmentDetails;
import com.cs157a.backend.model.Enrollment;

@Repository
public class EnrollmentDAO {
    // singleton instance for database connection management
    private DBConnection dbConnection = DBConnection.getInstance();
    
    public boolean enrollmentExists(Long studentId, String courseName) {
    	String sql = """
            SELECT COUNT(*) 
            FROM Enrollments e
            INNER JOIN Courses c ON e.CourseID = c.CourseID
            WHERE e.StudentID = ? AND c.CourseName = ?
        """;
    	 try(PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
    		// Set the query parameters
	        preparedStatement.setLong(1, studentId);
	        preparedStatement.setString(2, courseName);
	        
	        // Execute the query
	        try (ResultSet resultSet = preparedStatement.executeQuery()) {
	            if (resultSet.next()) {
	                // check if the count is greater than 0
	                return resultSet.getInt(1) > 0;
	            }
	        }
    	 } catch (SQLException e) {
             e.printStackTrace();
         }
    	 return false;
    }

    public List<EnrollmentDetails> getEnrollmentDetails() {
        List<EnrollmentDetails> details = new ArrayList<>();
        
        String sql = """
           SELECT 
			    Students.StudentID,
			    Enrollments.EnrollmentID,
			    Students.Name AS StudentName,
			    Courses.CourseName AS CourseName,
			    Courses.Section AS CourseSection,
			    Courses.Credits AS CourseCredits,
			    Enrollments.EnrollmentDate
			FROM 
			    Enrollments
			INNER JOIN 
			    Students ON Enrollments.StudentID = Students.StudentID
			INNER JOIN 
			    Courses ON Enrollments.CourseID = Courses.CourseID
			ORDER BY 
			    Courses.CourseName, Courses.Section;
        """;
        try(PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                EnrollmentDetails enrollmentDetails = new EnrollmentDetails();

                // Extract data from the ResultSet
                enrollmentDetails.setStudentId(resultSet.getLong("StudentID"));
                enrollmentDetails.setEnrollmentId(resultSet.getLong("EnrollmentID"));
                enrollmentDetails.setStudentName(resultSet.getString("StudentName"));
                enrollmentDetails.setCourseName(resultSet.getString("CourseName"));
                enrollmentDetails.setCourseSection(resultSet.getInt("CourseSection"));
                enrollmentDetails.setCourseCredits(resultSet.getInt("CourseCredits"));
                enrollmentDetails.setEnrollmentDate(resultSet.getDate("EnrollmentDate").toLocalDate());

                // Add to the list
                details.add(enrollmentDetails);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return details;

    }

    // Retrieve all enrollments
    public List<Enrollment> getRecords() {
        List<Enrollment> enrollments = new ArrayList<>();
        String sql = "SELECT * FROM Enrollments";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Long enrollmentId = resultSet.getLong("EnrollmentID");
                Long studentId = resultSet.getLong("StudentID");
                Long courseId = resultSet.getLong("CourseID");
                LocalDate enrollmentDate = resultSet.getDate("EnrollmentDate").toLocalDate();

                enrollments.add(new Enrollment(enrollmentId, studentId, courseId, enrollmentDate));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return enrollments;
    }

    // Add a new enrollment
    public void addRecord(Enrollment enrollment) {
        String sql = "INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) VALUES (?, ?, ?)";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql,Statement.RETURN_GENERATED_KEYS )) {
            preparedStatement.setLong(1, enrollment.getStudentId());
            preparedStatement.setLong(2, enrollment.getCourseId());
            preparedStatement.setDate(3, java.sql.Date.valueOf(enrollment.getEnrollmentDate()));
            preparedStatement.executeUpdate();

            // check if there is a generate key
            ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                // get the enrollment id of the new tuple inserted in database
                Long enrollmentId = generatedKeys.getLong(1);
                // set the enrollment it to the enrollment object
                enrollment.setEnrollmentId(enrollmentId);;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Update an existing enrollment
    public void updateRecord(Enrollment enrollment) {
        String sql = "UPDATE Enrollments SET StudentID = ?, CourseID = ?, EnrollmentDate = ? WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollment.getStudentId());
            preparedStatement.setLong(2, enrollment.getCourseId());
            preparedStatement.setDate(3, java.sql.Date.valueOf(enrollment.getEnrollmentDate()));
            preparedStatement.setLong(4, enrollment.getEnrollmentId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Delete an enrollment
    public void deleteRecord(Long enrollmentId) {
        String sql = "DELETE FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Check if an enrollment exists
    public boolean exists(Long enrollmentId) {
        String sql = "SELECT * FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Retrieve a single enrollment by ID
    public Enrollment getRecordById(Long enrollmentId) {
        String sql = "SELECT * FROM Enrollments WHERE EnrollmentID = ?";

        try (PreparedStatement preparedStatement = dbConnection.getMySqlConnection().prepareStatement(sql)) {
            preparedStatement.setLong(1, enrollmentId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                Long eId = resultSet.getLong("EnrollmentID");
                Long studentId = resultSet.getLong("StudentID");
                Long courseId = resultSet.getLong("CourseID");
                LocalDate enrollmentDate = resultSet.getDate("EnrollmentDate").toLocalDate();

                return new Enrollment(eId, studentId, courseId, enrollmentDate);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
