// const {prisma} = require('./db')
// const bcrypt=require('bcrypt')
// const get=async()=>{
//     const name='ABMINSTITUTE'
//     const phone="9861596887"
//     const email='sharangyawali@gmail.com'
//     const password='R@ND0MG3N3R@t3'
//     const role="Admin"
//     const saltRounds = await bcrypt.genSalt(10);
//     const encrypted_password = await bcrypt.hash(password, saltRounds);
//     console.log(encrypted_password)
//     const user=await prisma.User.create({
//         name,phone,email,password:encrypted_password,role,isverified:true
//     })
//     console.log(user)
// }
// get()

// INSERT INTO "User" (name,email,phone,password,role,isverified) VALUES ('ABMINSTITUTE','sharangyawali@gmail.com','9861596887','$2b$10$fQOKnxtXbmRcdOAzJ2AA9ebZ5X3d4PVksbEHlg/tjRrIJb260bcPu','Admin',TRUE);