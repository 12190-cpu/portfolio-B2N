import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username !== adminUsername) {
    return res.status(401).json({
      message: "Identifiants incorrects"
    });
  }

  const hashedPassword = bcrypt.hashSync(adminPassword, 10);
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Identifiants incorrects"
    });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    message: "Connexion réussie",
    token
  });
};