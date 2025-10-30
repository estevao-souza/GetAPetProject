## Get a Pet

### About this project
Get a Pet is a pet adoption application created to demonstrate my skills in developing a full-stack web application using the MERN stack. It connects people with pets and includes several features, such as:
- Authentication system: handles user authentication and authorization.
- Middlewares: manage specific criteria and logic for each back-end route, such as validation, authentication and image upload.
- Redux: used with services and slices to properly manage and handle API call states.
- MongoDB Atlas: used to store all user and post data in a cloud-based NoSQL database.
- Local storage: used to store all profile and pet images.

### Observations
This project was developed to demonstrate my skills in building a full-stack application inspired by a cause I believe is important.

### Functionalities
- Sign in, sign up and sign out user.
<p align="center">
  <img width="98%" alt="1 - Register" src="https://github.com/user-attachments/assets/bd456383-a367-44de-b3e5-e12a27f4ec90" />
  <img width="98%" alt="2 - Login" src="https://github.com/user-attachments/assets/fd531389-6fbe-49ad-8b19-b275118d9600" />
</p>
<br>

- Update user profile information: username, phone number, password and profile photo.
<p align="center">
  <img width="98%" alt="1 - EditProfileMan" src="https://github.com/user-attachments/assets/0d3267a5-e1b6-4ea4-90e0-cc0bf57d715c" />
</p>
<br>

- Delete user account.
<p align="center">
  <img width="98%" alt="2 - DeleteUserMan" src="https://github.com/user-attachments/assets/c250e450-ad36-4bf5-b47e-8047a824f6ed" />
</p>
<br>

- View the home feed with all available and adopted pets.
<p align="center">
  <img width="98%" alt="HomeDone" src="https://github.com/user-attachments/assets/dbfe62d2-e298-4369-8a4f-975192771860" />
</p>
<br>

- View pet details, with the option to request or cancel a visit.
<p align="center">
  <img width="98%" alt="PetDetails" src="https://github.com/user-attachments/assets/8c18d247-e7b5-4de6-9751-cea3f5c193f9" />
  <img width="98%" alt="PetDetailsPending" src="https://github.com/user-attachments/assets/6df9f126-1809-45e3-acee-3e80357483bc" />
</p>
<br>

- Create, Update and Delete pets.
<p align="center">
  <img width="98%" alt="2 - RegisterPet1" src="https://github.com/user-attachments/assets/7699593e-6c91-46c3-815c-1006012dea1b" />
  <img width="98%" alt="3 - EditPet" src="https://github.com/user-attachments/assets/455c2e73-92ae-4ffd-bffa-94b00c33e5de" />
  <img width="98%" alt="4 - MyPetsDelete" src="https://github.com/user-attachments/assets/ff3ac41e-0241-4489-9577-7effb50229e3" />
</p>
<br>

- My Pets feed: displays all of a user's pets, with options to conclude an adoption or cancel a visit.
<p align="center">
  <img width="98%" alt="1 - MyPetsAll" src="https://github.com/user-attachments/assets/27fb33fd-7300-4b92-8da8-2c67f08671ba" />
</p>
<br>

- My Adoptions feed: displays all of a user's adoption requests, including the contact information of the pet owner and the option to cancel a visit.
<p align="center">
  <img width="98%" alt="1 - MyAdoptionsPending" src="https://github.com/user-attachments/assets/da055ad2-fd2e-42d1-b935-c23e0285d253" />
  <img width="98%" alt="2 - MyAdoptionsDone" src="https://github.com/user-attachments/assets/a37674ea-4856-4e97-b686-0492730eb72e" />
</p>
<br>


### Getting Started
To run this application in development mode, first create an account on MongoDB Atlas and set up a database named getapet_database. Then, add your MongoDB username, password and JWT secret to the back-end’s .env file.

