class EmployeeList{
    constructor(){
       this.userList=[];
    }
    Add_emp(emp){
        this.userList=[...this.userList,emp];
    }
    Find_Emp_Position(id){
        for(var i in this.userList){
            if(this.userList[i]._id==id){
                return i;
            }
        }
        return -1;  
    }
    Edit_emp(new_emp){
        var pos=this.Find_Emp_Position(new_emp._id);
        this.userList[pos]=new_emp;
    }
    Delete_emp(id){
        var pos=this.Find_Emp_Position(id);
        this.userList.splice(pos,1);
    }
    FindByID(keyword){
        
        for(var emp of this.userList){
            if(emp._id==keyword){
               return emp;
            }
        }
        return -1;
    }
    FindByName(keyword){
        var findOutList=[]
        for(var emp of this.userList){
            if(emp._name.toLowerCase().indexOf(keyword.toLowerCase())!=-1){
                findOutList=[...findOutList,emp];
            }
        }
        return findOutList;
    }
    OrderListSalary(value){
        this.userList.sort( (a,b) => {
            
            if(a.netSalary() > b.netSalary()){
                return value; // tăng dần
            }
            else if(a.netSalary() < b.netSalary()){
                return -value; // giảm dần
            }
            else{
                return 0;
            }
        })
    }
    OrderListAge(value){
        this.userList.sort( (a,b) => {
            
            if(a.Age() > b.Age()){
                return value; // tăng dần
            }
            else if(a.Age() < b.Age()){
                return -value; // giảm dần
            }
            else{
                return 0;
            }
        })
    }
    OrderListName(value){
        this.userList.sort( (a,b) => {
            
            if(a._name[0] > b._name[0]){
                return value; // tăng dần
            }
            else if(a._name[0] < b._name[0]){
                return -value; // giảm dần
            }
            else{
                return 0;
            }
        })
    }
    FindMaxSalary(list){
        var max=list[0].netSalary();
        var found; var array=[];
        for(var person of list){
            if(person.netSalary()>max){
                max=person.netSalary();
                found=person;
                console.log(person);
            }
        }
        array=[...array,found];
        return array;
    }
    ListSalaryOver10(list){
        var found=[];
        for(var staff of list){
            if(staff.netSalary()>10000000){
                found=[...found,staff];
            }
        }
        return found;
    }

    
}