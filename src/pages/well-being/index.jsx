import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "./wellbeing.css"

export default function WellBeing() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header/>
          <main>
            <div id="rectangle">
              <div className="centro">
                <div className="speedometer_container">
                  <div>
                    <div className="speedometer">
                      <svg viewBox='0 0 100 100' width="310" height="155">
                        <circle cx="36" cy="36" r="32" id="speedometer1"></circle>
                        <circle cx="36" cy="36" r="32" id="speedometer2"></circle>
                      </svg>



                      {/* <svg width="310" height="155" viewBox="0 0 310 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M298.375 155C304.795 155 310.045 149.788 309.564 143.386C308.334 127.008 304.505 110.904 298.201 95.6841C290.412 76.8786 278.995 59.7915 264.602 45.3984C250.208 31.0054 233.121 19.5882 214.316 11.7987C195.51 4.00919 175.355 -8.8974e-07 155 0C134.645 8.89741e-07 114.49 4.0092 95.6841 11.7987C76.8786 19.5882 59.7915 31.0054 45.3984 45.3985C31.0054 59.7915 19.5881 76.8786 11.7987 95.6841C5.4945 110.904 1.66641 127.008 0.43573 143.386C-0.0453441 149.788 5.20469 155 11.625 155C18.0453 155 23.1968 149.785 23.7625 143.39C24.9411 130.068 28.1435 116.979 33.2789 104.581C39.8999 88.5968 49.6046 74.0728 61.8387 61.8387C74.0728 49.6046 88.5968 39.8999 104.581 33.2789C120.566 26.6578 137.698 23.25 155 23.25C172.302 23.25 189.434 26.6578 205.419 33.2789C221.403 39.8999 235.927 49.6046 248.161 61.8387C260.395 74.0728 270.1 88.5968 276.721 104.581C281.857 116.979 285.059 130.068 286.237 143.39C286.803 149.785 291.955 155 298.375 155Z" fill="#F0F0F0"/>
                        <circle cx="36" cy="36" r="32" id="speedometer1"></circle>  
                      </svg> */}

                    </div>
                    <div className="container-speed-value">
                      <strong className="speed-value">KHM</strong>
                      <strong className="speed-value" id="speed">0</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div id="cards">
                <div id="vacine">
                </div>
                <div id="appointment">
                </div>
                <div id="deworming">
                </div>
              </div>
            </div>
          </main>
        </section>
      </main>
    );
  }