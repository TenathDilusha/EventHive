import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <input placeholder="Email" />
        <br />
        <input placeholder="Password" type="password" />
        <br />
        <button>Login</button>
      </main>
    </>
  );
}
