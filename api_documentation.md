
# GibiGubae - User API

## **Register User**
### **POST** `/api/users/register`
#### **Request**
**URL:**  
`localhost:3000/api/users/register`  

**Body (form-data):**
| Key         | Value |
|------------|--------------------------------|
| `idPicture`  | `postman-cloud:///1effce23-8695-43d0-9d93-8e400c2366a4` |
| `fullName`  | `Nathnael Tamirat` |
| `studentId` | `######` |
| `email`     | `nathnaeltamirat3@gmail.com` |
| `password`  | `123456788` |
| `isAdmin`   | `true` |

#### **Response**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## **Login User**
### **POST** `/api/users/login`
#### **Request**
**URL:**  
`localhost:3000/api/users/login`  

**Body (raw JSON):**
```json
{
  "email": "nathnaeltamirat3@gmail.com",
  "password": "123456788"
}
```

#### **Response**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNTEzOTU1LCJleHAiOjE3NDIxMTg3NTV9.qhPjiso7p3s0F6A2zJOhrO0RNcskAcCUn3q3Homvn7E",
  "user": {
    "id": 3,
    "email": "nathnaeltamirat3@gmail.com",
    "fullName": "Nathnael Tamirat"
  }
}
```

---

## **Get User by ID**
### **GET** `/api/users/:id`
#### **Request**
**URL:**  
`localhost:3000/api/users/1`  
`localhost:3000/api/users/4`  

#### **Authorization**
- **Type:** `Bearer Token`  
- **Token:** `<token>`

#### **Response**
```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": 3,
    "fullName": "Nathnael Tamirat",
    "studentId": "###",
    "gender": "male",
    "buildingBlock": null,
    "dormNumber": null,
    "email": "nathnaeltamirat3@gmail.com",
    "phone": null,
    "studentPicture": null,
    "batch": "2",
    "degreeType": null,
    "isAdmin": true,
    "createdAt": "2025-03-09T09:38:06.000Z",
    "updatedAt": "2025-03-09T09:38:06.000Z",
    "apostleId": null,
    "familyId": null
  }
}
```

---

## **Delete User**
### **DELETE** `/api/users/delete/:id`
#### **Request**
**URL:**  
`localhost:3000/api/users/delete/1`  
`localhost:3000/api/users/delete/5`  

#### **Authorization**
- **Type:** `Bearer Token`  
- **Token:** `<token>`

#### **Response**
```json
{
  "message": "User deleted successfully"
}
```
