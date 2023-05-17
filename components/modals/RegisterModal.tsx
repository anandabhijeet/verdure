import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Loader from "../Loader";
import { useRouter } from "next/router";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ontoggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/register", {
        email,
        username,
        name,
        password,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Account created.");
      }

      signIn("credentials", {
        email,
        password,
      });
      router.push('/dashboard');
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      registerModal.onClose();
    } finally {
      setIsLoading(false); //whatever may be the conditions its gonna set isloading false
    }
  }, [email, name, password, registerModal, router, username]);

  const body = (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <Input
        type="email"
        disabled={isLoading}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <Input
        type="text"
        disabled={isLoading}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
      />
      <Input
        type="text"
        disabled={isLoading}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Username"
      />
      <Input
        type="password"
        disabled={isLoading}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-2" style={{ width:'100%'}}>
          <Loader />
        </div>
      ) : (
        <button
          onClick={onSubmit}
          className="my-4 py-2 d-flex justify-content-center "
          type="submit"
          style={{
            all: "unset",
            cursor: "pointer",
            color: "#1d0739",
            backgroundColor: "#fff",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          Sign Up
        </button>
      )}
    </div>
  );

  const footer = (
    <div
      className="mt-4"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#fff" }}>
        Already have an account?{" "}
        <span
          onClick={ontoggle}
          style={{ color: "#966ec9", fontWeight: 500, cursor: "pointer" }}
        >
          Sign In
        </span>
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Sign up"
      onClose={registerModal.onClose}
      body={body}
      footer={footer}
      onSubmit={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default RegisterModal;
