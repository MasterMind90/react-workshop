const users = []; 

const identification = document.getElementById('id');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const major = document.getElementById('major');
const yearOfStudy = document.getElementById('yearOfStudy');

const tableBody = document.getElementById('tableBody');

const filterAge = document.getElementById('filter-age');
const filterMajor = document.getElementById('filter-major');

const validateRules = {
  id: {
    validate: (val) => {
      if (val.length != 9) return false;
      for (const c of val) {
        if (c < '0' || c > '9') return false;
      }
      return true;
    },
    errorMessage: 'The length of the id must be 9 digits (numbers only)'
  },
  firstName: {
    validate: (val) => {
      if (!val) return false;
      for (const c of val) {
        if (c >= 'a' && c <= 'z') continue;
        if (c >= 'A' && c <= 'Z') continue;
        return false;
      }
      return true;
    },
    errorMessage: 'First name must consist of only letters'
  },
  lastName: {
    validate: (val) => {
      if (!val) return false;
      for (const c of val) {
        if (c >= 'a' && c <= 'z') continue;
        if (c >= 'A' && c <= 'Z') continue;
        return false;
      }
      return true;
    },
    errorMessage: 'Last name must consist of only letters'
  },
  age: {
    validate: (val) => {
      if (!val) return false;
      for (const c of val) {
        if (!(c >= '0' && c <= '9')) return false;
      }
      const intval = parseInt(val); 
      if (intval <= 0 || intval > 120) return false;
      return true;
    },
    errorMessage: 'Age must between 1 and 120'
  },
  email: {
    validate: (val) => {
      if (!val) return false;
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (val.match(validRegex)) return true;
      return false;
    },
    errorMessage: 'Not a valid email address'
  },
  phoneNumber: {
    validate: (val) => {
      if (!val) return false;
      for (const c of val) {
        if (!(c >= '0' && c <= '9')) return false;
      }
      if (val.length < 8 || val.length > 10) return false;
      return true;
    },
    errorMessage: 'Phone number consist 8 to 10 digits (only numbers)'
  },
  yearOfStudy: {
    validate: (val) => {
      if (!val) return false;
      for (const c of val) {
        if (!(c >= '0' && c <= '9')) return false;
      }
      const intval = parseInt(val);
      if (intval < 1 || intval > 10) return false;
      return true;
    },
    errorMessage: 'Year of study must be between 1 and 10'
  }

}; 
const validate = (field) => {
  if (!validateRules[field]) {
    alert('something went wrong!')
    return false;
  }
  if (validateRules[field].validate(document.getElementById(field).value)) {
    document.getElementById(field).style.border = '2px solid mediumseagreen';
    document.getElementById(field + '-error').innerText = '';
  }
  else {
    console.log(validateRules[field].errorMessage);
    document.getElementById(field).style.border = '2px solid tomato';
    document.getElementById(field + '-error').innerText = validateRules[field].errorMessage;
    return false;
  }
  return true;
}

const register = () => {
  let isOk = true;
  for (const [key, val] of Object.entries(validateRules)) {
    if(!validate(key)) {
      isOk = false;
    }
  }
  if (!isOk) {
    document.getElementById('submit-error').innerText = 'Make sure the above fields are filled correctly';
    document.getElementById('submit-error').style.color = 'tomato';
    return;
  }
  else document.getElementById('submit-error').innerText = '';
  
  const student = {
    student_id: Math.floor(Math.random() * 1000),
    ID: identification.value,
    FirstName: firstName.value,
    LastName: lastName.value,
    age: age.value,
    Gender: gender.selectedIndex,
    Email: email.value,
    PhoneNumber: phoneNumber.value,
    Address: address.value,
    Major: major.value,
    YearOfStudy: yearOfStudy.value,
    Status: 0,
    isDelete: false,
  };
  users.push(student);
  console.log('users :>> ', users);
  document.getElementById('submit-error').innerText = student.FirstName + ' is added successfully';
  document.getElementById('submit-error').style.color = 'mediumseagreen';
}

const filterUsers= () => {
  const age = filterAge.value;
  const major = filterMajor.value;
  if (!age && !major) {
    tableBody.innerHTML = users.filter((user) => !user.isDelete).map((user) => `<tr> <td>${user.ID}</td> <td>${user.FirstName + ' ' + user.LastName}</td> <td> <button onclick="toggleActivateUser(${user.student_id})">${user.Status == 0 ? 'Activate' : 'Deactivate'}</button> <button onclick="showStudent(${user.student_id})">Show Data</button> <button onclick="deleteUser(${user.student_id})">Delete</button> </td> </tr>`).join('');
  }
  else if (age && major) {
    tableBody.innerHTML = users.filter((user) => !user.isDelete && user.age == age && user.Major == major).map((user) => `<tr> <td>${user.ID}</td> <td>${user.FirstName + ' ' + user.LastName}</td> <td> <button onclick="toggleActivateUser(${user.student_id})">${user.Status == 0 ? 'Activate' : 'Deactivate'}</button> <button onclick="showStudent(${user.student_id})">Show Data</button> <button onclick="deleteUser(${user.student_id})">Delete</button> </td> </tr>`).join('');
  }
  else if (age) {
    tableBody.innerHTML = users.filter((user) => !user.isDelete && user.age == age).map((user) => `<tr> <td>${user.ID}</td> <td>${user.FirstName + ' ' + user.LastName}</td> <td> <button onclick="toggleActivateUser(${user.student_id})">${user.Status == 0 ? 'Activate' : 'Deactivate'}</button> <button onclick="showStudent(${user.student_id})">Show Data</button> <button onclick="deleteUser(${user.student_id})">Delete</button> </td> </tr>`).join('');
  }
  else if (major) {
    tableBody.innerHTML = users.filter((user) => !user.isDelete && user.Major == major).map((user) => `<tr> <td>${user.ID}</td> <td>${user.FirstName + ' ' + user.LastName}</td> <td> <button onclick="toggleActivateUser(${user.student_id})">${user.Status == 0 ? 'Activate' : 'Deactivate'}</button> <button onclick="showStudent(${user.student_id})">Show Data</button> <button onclick="deleteUser(${user.student_id})">Delete</button> </td> </tr>`).join('');
  }
  else {
    console.log('something went wrong');
  }

}

const deleteUser = (id) => {
  console.log(id);
  users.forEach((user) => {
    if (user.student_id == id) {
      user.isDelete = true;
    }
  })
  filterUsers();
  console.log('users :>> ', users);
}

const toggleActivateUser = (id) => {
  users.forEach((user) => {
    if (user.student_id == id) {
      user.Status = !user.Status;
    }
  })
  console.log('users :>> ', users);
  filterUsers();
}

const student = {
  ID: 1,
  FirstName: "Jane",
  LastName: "Smith",
  age: 22,
  Gender: "Female",
  Email: "janesmith@example.com",
  PhoneNumber: "987-654-3210",
  Address: "456 Elm Street",
  Major: "Psychology",
  YearOfStudy: "4",
  Status: 0,
  isDelete: false,
};

const student2 = {
  ID: 2,
  FirstName: "John",
  LastName: "Doe",
  age: 20,
  Gender: "Male",
  Email: "johndoe@example.com",
  PhoneNumber: "123-456-7890",
  Address: "123 Main Street",
  Major: "Computer Science",
  YearOfStudy: "2",
  Status: 1,
  isDelete: false,
};

users.push(student);
users.push(student2);

const showStudent = (stdId) => {
  console.log("stdId", stdId);
  const studentData = document.getElementById("std-data");
  let targetStudent = {} ; 
  users.forEach((user) => {
    if (user.student_id == stdId) {
      targetStudent = user; 
    }
  })
  if (targetStudent.Status == 0) {
      studentData.classList.remove("display-block");
      studentData.classList.add("display-none");
      alert("The Student is Pending");
  }
  else {
      studentData.classList.remove("display-none");
      studentData.classList.add("display-block");
      const gen = ['Male', 'Female', 'Others']; 
      console.log('targetStudent :>> ', targetStudent); 
      const value = ` <h2>Student Information</h2> <p><strong>ID:</strong> <span id="id">${targetStudent.ID}</span></p> <p><strong>First Name:</strong> <span id="firstName">${targetStudent.FirstName}</span></p> <p><strong>Last Name:</strong> <span id="lastName">${targetStudent.LastName}</span></p> <p><strong>Age:</strong> <span id="age">${targetStudent.age}</span></p> <p><strong>Gender:</strong> <span id="gender">${gen[targetStudent.Gender]}</span></p> <p><strong>Email:</strong> <span id="email">${targetStudent.Email}</span></p> <p><strong>Phone Number:</strong> <span id="phoneNumber">${targetStudent.PhoneNumber}</span></p> <p><strong>Address:</strong> <span id="address">${targetStudent.Address}</span></p> <p><strong>Major:</strong> <span id="major">${targetStudent.Major}</span></p> <p><strong>Year of Study:</strong> <span id="yearOfStudy">${targetStudent.YearOfStudy}</span></p> <p><strong>Status:</strong> <span id="status">${targetStudent.Status ? 'Active' : 'Pending'}</span></p> <p><strong>Is Deleted:</strong> <span id="isDelete">${targetStudent.isDelete}</span></p> `
      studentData.innerHTML = value; 
  }
};
