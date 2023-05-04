import { Sigmar_One } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import {BsTwitter, BsInstagram, BsYoutube} from 'react-icons/bs';
import Link from "next/link";
import Image from "next/image";
import LoginModal from "@/components/modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
const sigmar = Sigmar_One({
  subsets: ["latin"],
  weight: "400"
});
const dancing_script = Dancing_Script({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const {data: currentUser} = useCurrentUser();

  const handleClick = () => {
    if(currentUser){
      router.push("/dashboard");
    }else{
         loginModal.onOpen();
    }
  };

  // useEffect(()=>{
  //   if(currentUser){
  //     router.push("/dashboard");
  //   }
  // },[currentUser, router])
{/* <div className="row">
  <div className="col">
    <img src="https://images.unsplash.com/photo-1608493830924-ec843d9c98c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
  </div>
</div> */}
  const Header = () => {
    const [currentTab, setCurrentTab] = useState("hero");

    const changeTab = (tab: string): void => {
      console.log(tab)
      setCurrentTab(tab);
      
    };

    return (
      <nav className="navbar navbar-expand-lg bg-light fixed-top ">
        <div className="container d-flex justify-content-between align-items-center">
          <span
            className={dancing_script.className}
            style={{ fontWeight: "bolder", fontSize: "25px", color: "#9E1DDA" }}
          >
            Verdure
          </span>

          <div className="d-flex gap-3">
            <Link
              href='#hero'
              onClick={() => changeTab("hero")}
              className={clsx(
                { [styles.navOptions]: true },
                { [styles.active]: false }
              )}
            >
              Hero
            </Link>
            <Link 
             href='#awareness'
              onClick={() => changeTab("awareness")}
              className={clsx(
                { [styles.navOptions]: true },
                { [styles.active]: currentTab === "awareness" }
              )}
            >
              Awareness
            </Link>
            <Link
             href='#community'
              onClick={() => changeTab("community")}
              className={clsx(
                { [styles.navOptions]: true },
                { [styles.active]: currentTab === "community" }
              )}
            >
              Community
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  const Footer = () => {
    return (
      <div className="py-4" style={{width:'100%', backgroundColor:'#9e1dda'}}>
           <div className="container d-flex justify-content-center align-items-center my-4 py-4">
              <h1 style={{color:'#fff'}} className={dancing_script.className}>Verdure</h1>
           </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Toaster/>
      <div className="container vstack justify-content-center align-items-center  "  style={{marginTop:'54px', paddingTop:'1px', position:'relative'}}>
        <section id="hero">
          {/* hero section */}
          <div className={styles.heroBanner}>
            <div className="row" style={{ height: "100%" }}>
              <div className="col-1" style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                 <div className="gap-3" style={{color:'#250135',display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}} >
                  <BsInstagram size='18px' />
                  <BsTwitter size='18px' />
                  <BsYoutube size='18px' />
                 </div>
              </div>
              <div
                className="col-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <h2>
                  Breaking the stigma: Prioritizing
                  <br/>
                  <span className={sigmar.className} style={{ color: "#492a6c" }}>
                     Mental Health 
                  </span>
                  <br/>
                    for a happier you.
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    marginTop: "25px",
                    marginRight: "75px",
                  }}
                >
                  Mental health awareness is about understanding the importance
                  of <span className={sigmar.className}>Mental health</span>, promoting education and resources for mental
                  health disorders, breaking down stigma, and encouraging
                  individuals to prioritize their mental health for a happier
                  and healthier life.
                </p>
                <div style={{ width: "100%", marginTop: "16px" }}>
                  <button onClick={handleClick} className={styles.customButton}>
                    First step
                  </button>
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="col-6 "
              >
                <div className={styles.heroBannerImg}></div>
              </div>
            </div>
          </div>
        </section>
        <section id="awareness" style={{marginTop:'65px'}}>
        <h1 className="my-5">Mental Health Matters</h1>
          {/* awareness section */}
          <div className="row mb-3"  >
            
            <div className="col-4" >
              <img  className="img-fluid" style={{borderRadius:'16px 0px 0px 16px', maxHeight:'80vh'}} src="https://images.unsplash.com/photo-1608493830924-ec843d9c98c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="health" />
            </div>
            <div className="col-8 d-flex justify-content-start flex-column">
              
              <p style={{textAlign:'start', margin:"0px"}}><span className={sigmar.className} >Mental health</span> awareness is crucial for promoting mental health and wellbeing. It involves educating people about mental health conditions and breaking the stigma surrounding mental illness. Raising awareness can also help prevent the onset of mental illness and promote healthy habits. To promote mental health awareness, we can provide information and resources, encourage open dialogue about mental health, and take action to support individuals who may be struggling. By prioritizing mental health, we can create a more supportive and understanding society.</p>
              <p className="my-1">Raising awareness about mental health can also help reduce the incidence of mental illness. By educating people about the risk factors for mental health conditions, such as genetics, trauma, and stress, individuals can take steps to prevent the onset of these conditions. Additionally, raising awareness about the importance of mental health and wellbeing can help promote healthy habits and lifestyles, which can have a positive impact on mental health.</p>
              <p className="my-1">There are several ways to promote mental health awareness. One of the most effective ways is through education. This can involve providing information about mental health conditions, their symptoms, and treatment options through workshops, seminars, or public awareness campaigns. Another way to raise awareness is by encouraging open dialogue about mental health. This can involve creating safe spaces for individuals to discuss their experiences with mental health and providing resources for those who may need help.</p>
              <p className="my-1">In addition to raising awareness, it is also important to take action to support individuals who may be struggling with mental health issues. This can involve providing access to mental health services, such as counseling or therapy, and creating a supportive environment for individuals who may be struggling. It is essential to understand that mental health conditions are not a personal failure, and everyone deserves the opportunity to seek help and support when they need it.</p>
              <p className="my-1">In conclusion, mental health awareness is an essential aspect of promoting mental health and wellbeing. By educating individuals about mental health conditions, breaking the stigma surrounding mental illness, and promoting healthy habits, we can work towards creating a society that values and prioritizes mental health. It is essential to recognize that mental health is just as important as physical health and to take action to support individuals who may be struggling with mental health issues. Together, we can work towards promoting mental health awareness and creating a more supportive and understanding society.</p>
            </div>
            
          </div>
          </section>
        <section id="community" style={{marginTop:'65px'}}>
          {/* community section */}
          <h1 className="my-4"><span style={{color:'##9e1dda'}} className={dancing_script.className}>verdure</span> Community</h1>
          <div className="d-flex justify-content-center my-4 py-5" style={{position:'relative', height:'50vh'}}>
          <img src="https://www.pngmart.com/files/7/Community-PNG-Image.png" alt="img" />
          </div>
          </section>
          <RegisterModal/>
          <LoginModal />
        
      </div>
      <Footer/>
      
    </>
  );
}
