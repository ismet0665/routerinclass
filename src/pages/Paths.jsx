import { Link, Outlet } from "react-router-dom";

const Paths = () => {
  return (
    <div className="container mt-4">
      <h1>
        Online IT Courses to Become a Qualified IT Professional with Clarusway
      </h1>

      <p className="fs-5">
        Join outstanding companies with rewarding salaries. We offer the
        highest-demand IT skills YOU need for success! CHOOSE THE BEST COURSE
        FOR YOU Upgrade your career with the best online training led by top IT
        experts!
      </p>
      <div>
        {/* Relative */}
        <Link className="btn btn-success w-50" to="fullstack/react">
          {/* Absolute */}
          {/* <Link className="btn btn-success w-50" to="/paths/fullstack"> */}
          Fullstack
        </Link>
        <Link className="btn btn-warning w-50" to="">
          Aws-Devops
        </Link>
      </div>
      {/* Outlet i nerde çagırırsak verilerimiz orda görüntülenir. Outlet ile seçilen child ın nereye basılacagını belirtiyoruz. Nested yapılarda her bir parent ta bir <Outlet /> olması lazım.   */}
      <Outlet />
    </div>
  );
};

export default Paths;
