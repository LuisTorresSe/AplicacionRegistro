


import { Outlet } from "react-router-dom";


function PrivateLayout() {
  return (



    <section className="w-full flex justify-center">

      <Outlet></Outlet>
    </section>

  );
}

export default PrivateLayout;
