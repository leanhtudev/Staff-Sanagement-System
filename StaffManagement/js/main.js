// =================FUNCTION===========
var titleHeader = ["STAFF REGISTER", "EDIT STAFF"];
var empList = new EmployeeList();

function Validation(){
    var bool=true;
    if(!checkNull("txtId","tbInput","Please enter employee's id")){
        bool=false;
    }else if(!checkDup("txtId",empList.userList,"tbInput","Id is existed.Please change id")){
        bool=false;
    }
    if(!checkNull("txtName","tbName","Please enter employee's name")){
        bool=false;
    }
    if(!checkNull("txtEmail","tbEmail","Please enter employee's email")){
        bool=false;
    }
    else if(!checkEmail("txtEmail","tbEmail","Email is not a correct format")){
        bool=false;
    }
    if(!checkNull("txtPhone","tbPhone","Please enter employee's phone number")){
        bool=false;
    }
    if(!checkNull("txtDOB","tbDOB","Please enter employee's day of birth")){
        bool=false;
    }
    if(!checkNull("txtSalary","tbSalary","Please enter employee's salary")){
        bool=false;
    }
    if(!checkNull("txtDays","tbDays","Please enter employee's working days")){
        bool=false;
    }
    if(!checkSelect("txtTitle","tbTitle","Please choose employee's title")){
        bool=false;
    }
    if(!checkNull("txtExtra","tbExtra","Please enter employee's working days")){
        bool=false;
    }
    return bool;
}
function addEmployee() {
   
   
    if(Validation()){
        var id = getEle("txtId").value;
    var name = getEle("txtName").value;
    var email = getEle("txtEmail").value;
    var phone = getEle("txtPhone").value;
    var dob = getEle("txtDOB").value;
    var salary = parseInt(getEle("txtSalary").value);
    var workingDays = parseInt(getEle("txtDays").value);
    var title = getEle("txtTitle").value;
    var extra = parseInt(getEle("txtExtra").value);
    
    var employee = new Employee(id, name, email, phone, dob, salary, workingDays, title, extra);
    var age=employee.Age();
    empList.Add_emp(employee);
    console.log(age);
    showTable(empList.userList);
    clearForm();
    }
   

}
//display employees to table
function showTable(list) {
    // list? list:empList.userList;
    var content = "";
    for (var emp of list) {
        content += `
            <tr>
            <td>${emp._id}</td>
            <td>${emp._name}</td>
            <td>${emp._email}</td>
            <td>${emp._phone}</td>
            <td>${emp._dob}</td>
            <td>${emp._salary}</td>
            <td>${emp._workingDays}</td>
            <td>${emp._title}</td>
            <td>${emp._extra}</td>
            <td>${emp.netSalary()}</td>
            <td class="d-flex">
                <button class="btn btn-success btnEdit mr-1"
                data-id="${emp._id}"
                data-name="${emp._name}"
                data-email="${emp._email}"
                data-phone="${emp._phone}"
                data-dob="${emp._dob}"
                data-salary="${emp._salary}"
                data-workingDays="${emp._workingDays}"
                data-title="${emp._title}"
                data-extra="${emp._extra}"
                
                >Edit</button>
                <button class="btn btn-danger btnDelete" data-id=${emp._id}>X</button>
            </td>
            </tr>
        `
    }
    getEle("txtTbody").innerHTML = content;
    editEvent("btnEdit");
    deleteEvent("btnDelete");
}
///reset form
function clearForm() {
    var inputArray = document.getElementsByClassName("input-sm");
    for (var input of inputArray) {
        input.value = '';
    }
    getEle("txtTitle").selectedIndex = 0;
}
//get element by id
function getEle(id) {
    return document.getElementById(id);
}
function tableChange(title, number) {
    //number 1 for staff registration and 2 for edit
    getEle("titleHeader").innerHTML = title;
    switch (number) {
        case 1:
            getEle("btnAddEmployee").style.display = "inline-block";
            getEle("btnEditEmployee").style.display = "none";
            getEle("txtId").removeAttribute('readonly',true);
            break;
        case 2:
            getEle("btnEditEmployee").style.display = "inline-block";
            getEle("btnAddEmployee").style.display = "none";
            getEle("txtId").setAttribute('readonly',true);
            break;
    }
}
//assign onclick function for edit button in the table
function editEvent(btnClassEdit) {
    btnArray = document.getElementsByClassName(btnClassEdit);
    for (var btn of btnArray) {
        btn.addEventListener('click', function () {
            var id = this.getAttribute("data-id");
            var name = this.getAttribute("data-name");
            console.log(name);
            var email = this.getAttribute("data-email");
            console.log(email);
            var phone = this.getAttribute("data-phone");
            var dob = this.getAttribute("data-dob");
            var salary = this.getAttribute("data-salary");
            var workingDays = this.getAttribute("data-workingDays");
            var title = this.getAttribute("data-title");
            var extra = this.getAttribute("data-extra");
            tableChange(titleHeader[1],2);
            getEle("txtId").value = id;
            
            getEle("txtName").value = name;
            getEle("txtEmail").value = email;
            getEle("txtPhone").value = phone;
            getEle("txtDOB").value = dob;
            getEle("txtSalary").value = salary;
            getEle("txtDays").value = workingDays;
            getEle("txtTitle").value = title;
            getEle("txtExtra").value = extra;

        })
    }
}

function edit(){
    var id = getEle("txtId").value;
    var name = getEle("txtName").value;
    var email = getEle("txtEmail").value;
    var phone = getEle("txtPhone").value;
    var dob = getEle("txtDOB").value;
    var salary = parseInt(getEle("txtSalary").value);
    var workingDays = parseInt(getEle("txtDays").value);
    var title = getEle("txtTitle").value;
    var extra = parseInt(getEle("txtExtra").value);

    var new_emp=new Employee(id, name, email, phone, dob, salary, workingDays, title, extra);
    empList.Edit_emp(new_emp);
    console.log(empList.userList);
    tableChange(titleHeader[0],1);
    clearForm();
    showTable(empList.userList)
}
function deleteEvent(btnClass){
    var btnArray=document.getElementsByClassName(btnClass);
    for(var btn of btnArray){
        btn.addEventListener('click',function(){
            var id=this.getAttribute("data-id");
            empList.Delete_emp(id);
            showTable(empList.userList);
        })
    }
}
function FindEmployee(){
    var keyword=getEle("searchInput").value;
    var findOutList=[];
    findOutList.push(empList.FindByID(keyword));
    if(findOutList[0]==-1){
        findOutList=empList.FindByName(keyword);
    }
    ChangeTableTitle("RESULT FOUND");
    showTable(findOutList);
}
function SortSalary(index){
    empList.OrderListSalary(index);
    showTable(empList.userList);
}
function SortAge(index){
    empList.OrderListAge(index);
    showTable(empList.userList);
}
function SortName(index){
    empList.OrderListName(index);
    showTable(empList.userList);
}
function MaxSalary(){
    var foundArray=empList.FindMaxSalary(empList.userList);
    ChangeTableTitle("EMPLOYEE WITH MAX SALARY")
    showTable(foundArray);
}
function GetStaffOver10(){
    var found=[];
    found=empList.ListSalaryOver10(empList.userList);
    ChangeTableTitle("EMPLOYEES' SALARY OVER 10 MILLIONS");
    showTable(found);
}
function ChangeTableTitle(title){
    getEle("tableTitle").innerHTML=title;
}
function checkNull(idInput,idThongBao,content){
    var bool=true;
    if(getEle(idInput).value==''){
        bool=false;
        getEle(idThongBao).innerHTML=content;
    }else{
        getEle(idThongBao).innerHTML='';
    }
    return bool;
}
function checkSelect(idInput,idThongBao,content){
    var bool=true;
    if(getEle(idInput).selectedIndex==0){
        bool=false;
        getEle(idThongBao).innerHTML=content;
    }else{
        getEle(idThongBao).innerHTML='';
    }
    return bool;
}
function checkDup(idInput,arr,idThongBao,content){
    bool=true;
    var id=getEle(idInput).value;
    for(var emp of arr){
        if(emp._id==id){
            bool=false;
            getEle(idThongBao).innerHTML=content;
        }
        else{
            getEle(idThongBao).innerHTML='';
        }
    }
    return bool;   
}
function checkEmail(idInput,idThongBao,content){
    var bool=true;
    var email=getEle(idInput).value;
    var patt=new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    if(!patt.test(email)){
        bool=false;
        getEle(idThongBao).innerHTML=content;
    }
    else{
        getEle(idThongBao).innerHTML='';
    }
    return bool;  
}


// =================CALL FUNCTION===========
getEle("btnAddEmployee").addEventListener('click', addEmployee);
getEle("btnEditEmployee").addEventListener('click', edit);
getEle("searchInput").addEventListener('keyup',FindEmployee);

getEle("upNetSalary").addEventListener('click',function(){
    SortSalary(-1);
    getEle("upNetSalary").style.display="none";
    getEle("downNetSalary").style.display="inline-block";
});
getEle("downNetSalary").addEventListener('click',function(){
    SortSalary(1);
    getEle("upNetSalary").style.display="inline-block";
    getEle("downNetSalary").style.display="none";
});
getEle("upAge").addEventListener('click',function(){
    SortAge(1);
    getEle("upAge").style.display="none";
    getEle("downAge").style.display="inline-block";
});
getEle("downAge").addEventListener('click',function(){
    SortAge(-1);
    getEle("upAge").style.display="inline-block";
    getEle("downAge").style.display="none";
});
getEle("upName").addEventListener('click',function(){
    SortName(1);
    getEle("upName").style.display="none";
    getEle("downName").style.display="inline-block";
});
getEle("downName").addEventListener('click',function(){
    SortName(-1);
    getEle("upName").style.display="inline-block";
    getEle("downName").style.display="none";
});
getEle("maxSalary").addEventListener('click',MaxSalary);
getEle("listOver10").addEventListener('click',GetStaffOver10);
// getEle("showList").addEventListener('click',showTable);