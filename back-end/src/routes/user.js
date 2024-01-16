const bycript = require("bcryptjs");
const express = require("express");
const userSchema = require("../models/user");
const { createAccessToken } = require("../libs/jwt");
const router = express.Router();

// create user
router.post("/register", async (req, res) => {
  try {
    const user = userSchema(req.body);

    // Necesitamos hashear la constraseña con bcrypt
    const passwordHash = bycript.hashSync(user.password, 10);
    user.password = passwordHash;

    // Guardar el usuario de manera asíncrona y esperar a que se complete
    const userSaver = await user.save();

    // Crear el token de acceso de manera asíncrona y esperar a que se complete
    const token = await createAccessToken({ id: userSaver._id });

    // Configurar la cookie y enviar la respuesta
    res.cookie("token", token);
    res.json({ id: userSaver._id, name: userSaver.name, email: userSaver.email, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  try {
    //solo necesitamos el email y la contraseña
    const UserFound = await userSchema.findOne({ email });
    if (!UserFound) return res.status(400).json({ message: "User not found" });

    const passwordMatch = bycript.compareSync(password, UserFound.password);

    if (!passwordMatch) return res.status(400).json({ message: "Invalid password" });


    // Crear el token de acceso de manera asíncrona y esperar a que se complete
    const token = await createAccessToken({ id: UserFound._id });

    // Configurar la cookie y enviar la respuesta
    res.cookie("token", token, {httpOnly: false, secure: false});
    
    console.log(token)
    console.log("Login successful");
    res.json({ id: UserFound._id, name: UserFound.name, email: UserFound.email, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//ahora necesitamos el logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
  console.log("Logout successful")
});

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .deleteOne({ _id: id })
      .then((data) => {
        if (data.deletedCount === 1) {
          res.json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  });
  

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;