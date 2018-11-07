class Employee{
    constructor(id,name,email, phone,dob,salary,workingDay,title,extra){
        this._id=id;
        this._name=name;
        this._email=email;
        this._phone=phone;
        this._dob=dob;
        this._salary=salary;
        this._workingDays=workingDay    ;
        this._title=title;
        this._extra=extra;
    }
    netSalary(){
        
        return (this._salary*this._workingDays+this._extra);
    }
    Age(){
        var year_dob=parseInt(this._dob.slice(0,4));
        var today=new Date();
        var year_today=today.getFullYear();
       
        var age =year_today-year_dob;
        return age;
    }

}