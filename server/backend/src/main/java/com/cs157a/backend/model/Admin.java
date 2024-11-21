package com.cs157a.backend.model;


public class Admin {
    private Long adminId;
    private String password;
    
    public Admin() {
        
    } 

    public Admin(Long adminId, String password) {
        this.adminId = adminId;
        this.password = password;
    }

    public Long getAdminId() {
        return this.adminId;
    }

    public String getPassword() {
        return this.password;
    }
    
    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "<AdmidId: " + this.getAdminId() + " Password: " + this.getPassword() + ">";
    }
}
