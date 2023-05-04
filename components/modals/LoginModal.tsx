import { useCallback, useState } from "react";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = useCallback(async()=>{
    try{
         setIsLoading(true);

        //  TODO login logic
        await signIn('credentials', {
            email,
            password
        })

        toast.success('Successfully logged in')
      loginModal.onClose()
    }catch(error){
        console.log(error);
        toast.error('Invalid Credential!')
    }finally{
        setIsLoading(false) //whatever may be the conditions its gonna set isloading false
    }
},[loginModal, email, password])

  const ontoggle = useCallback(() => {
    console.log("onToggle method is being called");
    if (isLoading) {
      return;
    }

    registerModal.onOpen();
    loginModal.onClose();
  }, [isLoading, registerModal, loginModal]);

  const body = (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <Input
        type="email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        disabled={isLoading}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <button
        className="my-4 py-2 d-flex justify-content-center "
        type="submit"
        onClick={()=>handleSignIn()}
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
        Log in
      </button>
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
        Create an account?{" "}
        <span
          onClick={ontoggle}
          style={{ color: "#966ec9", fontWeight: 500, cursor: "pointer" }}
        >
          SignUp
        </span>
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      body={body}
      footer={footer}
      onSubmit={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default LoginModal;
