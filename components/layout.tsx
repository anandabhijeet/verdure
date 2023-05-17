import React from "react";
import { Dancing_Script } from "next/font/google";
import {MdSpaceDashboard, MdChromeReaderMode} from 'react-icons/md';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const dancing_script = Dancing_Script({ subsets: ["latin"] });

function Layout({children }) {
  const router = useRouter();
  const handleSignOut = () => {
     router.push('/');
     signOut();
     toast.success('Logged out Successfully!')
  }
    
  return (
    <div>
      {/* <h1>layout</h1>
    {children} */}
      <div className="d-flex">
        <div
          style={{
            height: "100vh",
            backgroundColor: "#5C2698",
            color: "#fff",
            textAlign: "center",
            paddingInline:'8px',
            width:'106px'
          }}
        >
          <div
          className="d-flex justify-content-center align-items-center "
            style={{ height: "64px", borderBottom:'1px solid #fff', width: "100%",}}
          >
            <h4 className={dancing_script.className}>Verdure</h4>
          </div>
          
          <div className="d-flex align-items-center flex-column gap-5 my-5" style={{width:'100%'}}>
            <div className="vstack" style={{cursor:'pointer'}} >
                <MdSpaceDashboard size='28px'/>
                <p className="m-0" style={{fontSize:'12px', fontWeight:500}} >Dashboard</p>
    
            </div>

            <div className="vstack" style={{cursor:'pointer'}} >
                <MdChromeReaderMode size='28px'/>
                <p  className="m-0" style={{fontSize:'12px', fontWeight:500}}>Daily journal</p>
    
            </div>
          </div>

        </div>

        <div style={{width:'calc(100% - 106px)'}}>
          <div className="top-bar d-flex justify-content-between align-items-center px-2" style={{height:'64px', boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', width:'100%'}} >
            <h4 style={{color:'#5C2698'}}>Dashboard</h4>
            <button onClick={()=> {signOut(); localStorage.setItem('user', '')}} type="button" className="btn btn-outline-danger">Sign Out</button>
          </div>
          <main style={{padding:'8px'}}>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
