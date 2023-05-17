import React, {useEffect, useState} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data =

export function DonutChart() {
  const [scores, setScores] = useState<number[]>([]);
  const [user, setUser] = useState<any>({});
  useEffect(()=>{
    const local_user = localStorage.getItem('user');
    if (local_user) {
      console.log('current user', JSON.parse(local_user));
      const parsed_local_user = JSON.parse(local_user);
      console.log([parsed_local_user?.anxiety_score, parsed_local_user?.depression_score, parsed_local_user?.stress_score]);
      
      setUser(parsed_local_user);

    }
  },[])
  return (
    <div style={{ height: "300px", width: "400px"}}>
      <Doughnut
        data={{
          labels: ["Anxiety", "Depression", "Stress"],

          datasets: [
            {
              label: " wellness score ",
              data: [user?.anxiety_score, user?.depression_score, user?.stress_score],
              backgroundColor: [
                "rgb(255, 99, 133)",
                "rgb(54, 163, 235)",
                "rgb(255, 207, 86)",
              ],
            },
          ],
        }}
      />
    </div>
  );
}
