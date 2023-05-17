import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import QuestionsModal from "@/components/modals/questionModal";
import useQuestionsModal from "@/hooks/useQuestionsModal";
import axios from "axios";
import { DonutChart } from "@/components/DonutChart";
import { suggestions } from "@/constant/suggestions";

function Dashboard() {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("anxiety");
  const [tabActivitiesDataArray, setTabActivitiesDataArray] = useState<
    string[]
  >([]);
  const [tabExerciseDataArray, setTabExerciseDataArray] = useState<string[]>(
    []
  );
  const [user, setUser] = useState<any>({});

  const questionModal = useQuestionsModal();

  useEffect(() => {
    checkCurrentUser();
  }, []);

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      console.log("current user", JSON.parse(local_user));
      const parsed_local_user = JSON.parse(local_user);
      console.log([
        parsed_local_user?.anxiety_score,
        parsed_local_user?.depression_score,
        parsed_local_user?.stress_score,
      ]);
      // setWellnessScores([parsed_local_user?.anxiety_score, parsed_local_user?.depression_score, parsed_local_user?.stress_score]);
      setUser(parsed_local_user);
    }
  }, [currentUser, questionModal.isOpen]);

  useEffect(() => {
    if (currentTab === "anxiety") {
      setTabActivitiesDataArray(suggestions.anxiety.activities);
      setTabExerciseDataArray(suggestions.anxiety.exercise);
      console.log("sug", suggestions.anxiety);
    }

    if (currentTab === "depression") {
      setTabActivitiesDataArray(suggestions.depression.activities);
      setTabExerciseDataArray(suggestions.depression.exercise);
      console.log("sug", suggestions.depression);
    }

    if (currentTab === "stress") {
      setTabActivitiesDataArray(suggestions.stress.activities);
      setTabExerciseDataArray(suggestions.stress.exercise);
      console.log("sug", suggestions.stress);
    }
  }, [currentTab]);

  const checkCurrentUser = () => {
    console.log("current user called");
    axios
      .get("/api/current")
      .then((res) => {
        console.log("res", res.data);
        if (!res?.data) {
          router.push("/");
        }

        let score =
          res.data?.anxiety_score +
          res.data?.depression_score +
          res.data?.stress_score;
        if (score === 0) {
          questionModal.onOpen();
        }

        // setUser(localStorage.getItem('user'))
      })
      .catch((error) => {
        console.log("err", error);
        router.push("/");
      });
  };

  return (
    <Layout>
      <div style={{ width: "100%" }}>
        <div className="stack">
          <h5>Hello {currentUser?.name || user?.name},</h5>
        </div>

        <div
          className="gap-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <DonutChart />

        
        </div>
        <div>
            <div className="d-flex gap-5">
              <div
                onClick={() => setCurrentTab("anxiety")}
                className="tabs d-flex px-2 py-1"
                style={{ borderRadius: "8px", border: "1px solid grey", cursor:'pointer' }}
              >
                <span>Anxiety</span>
              </div>
              <div
                onClick={() => setCurrentTab("depression")}
                className="tabs d-flex px-2 py-1"
                style={{ borderRadius: "8px", border: "1px solid grey", cursor:'pointer' }}
              >
                <span>Depression</span>
              </div>
              <div
                onClick={() => setCurrentTab("stress")}
                className="tabs d-flex px-2 py-1"
                style={{ borderRadius: "8px", border: "1px solid grey", cursor:'pointer' }}
              >
                <span>Stress</span>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
            <div className="mt-4 d-flex flex-column">
              <span style={{ fontWeight: 500 }}>Activities</span>

            <div className="d-flex my-2" >
            {tabActivitiesDataArray
                ? tabActivitiesDataArray.map((data) => (
                  <span style={{paddingInline:'16px', paddingBlock:'4px', backgroundColor:'#89878744', borderRadius:'4px'}} className="mx-2" key={data}>{data}</span>
                  ))
                : null}
            </div>
            </div>
            <div className="mt-4 d-flex flex-column">
              <span style={{ fontWeight: 500 }}>Exercise</span>
              <div className="d-flex my-2" >
              {tabExerciseDataArray
                ? tabExerciseDataArray.map((data) => (
                    <span style={{paddingInline:'16px', paddingBlock:'4px', backgroundColor:'#89878744', borderRadius:'4px'}} className="mx-2" key={data}>{data}</span>
                  ))
                : null}
              </div>
            </div>
            </div>
          </div>
      </div>
      <QuestionsModal />
    </Layout>
  );
}

export default Dashboard;
