package com.cs157a.backend.dto;

import java.util.List;
import com.cs157a.backend.model.Course;
import com.cs157a.backend.model.Student;

public class CourseDetails extends Course {
    private List<Student> students;

    public CourseDetails(Long courseId, String courseName, int section, int credits, List<Student> students) {
        super(courseId, courseName, section, credits);
        this.students = students;
    }

    public List<Student> getStudents() {
        return students;
    }

   public void setStudents(List<Student> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return super.toString() + ", Students: " + students;
    }
}
