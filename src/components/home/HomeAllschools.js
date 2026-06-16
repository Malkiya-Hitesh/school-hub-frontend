import { Suspense } from "react";
import SchoolsPage from "../schools/SchoolsPage";


function HomeAllschools() {
  return (
    <Suspense>
      <SchoolsPage />
    </Suspense>
  )
}

export default HomeAllschools
