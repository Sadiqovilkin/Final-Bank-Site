class UsersClass {
  constructor(
    name,
    surname,
    address,
    city,
    region,
    phone,
    dateofbirth,
    email,
    password,
    image,
    companyName,
    seniority,
    gender
  ) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.city = city;
    this.region = region;
    this.phone = phone;
    this.dateofbirth = dateofbirth;
    this.email = email;
    this.password = password;
    this.image = image;
    this.companyName = companyName;
    this.seniority = seniority;
    this.gender = gender;
    this.loans = 0;
    this.balance = 0;
    this.role = "client";
    this.userId = `AZ` + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  }
}
export default UsersClass;
