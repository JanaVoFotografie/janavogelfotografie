import Link from "next/link";

/** Footer (Flex Builder block, identical on every page). */
export function SiteFooter() {
  return (
    <div className="flo-footer flo-footer--main disable-appear">
      <div className="flo-block flex-block-root flo-block--footer">
        <div className="flo-block__container">
          <div className="alignfull flex-block flex-block--blockID--46657" data-block-id="blockID--46657">
            <div className="flex-block__main-container">
              <div className="flex-block__element flex-block__element--element_id_926ca4e1c1c4 flex-block__element--vector flex-block__element--block-blockID--46657">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <path
                    fill="#eee"
                    d="M99.83,18.78c26.32,0,29.47,0,39.87,0.58c6.26,0.05,12.46,1.2,18.32,3.4c8.58,3.33,15.36,10.11,18.69,18.69 c2.19,5.86,3.34,12.06,3.4,18.32c0.5,10.4,0.58,13.55,0.58,39.87s0,29.47-0.58,39.87c-0.05,6.26-1.2,12.46-3.4,18.32 c-3.33,8.58-10.11,15.36-18.69,18.69c-5.86,2.19-12.06,3.34-18.32,3.4c-10.4,0.5-13.51,0.58-39.87,0.58s-29.47,0-39.87-0.58 c-6.26-0.05-12.46-1.2-18.32-3.4c-8.58-3.33-15.36-10.11-18.69-18.69c-2.19-5.86-3.34-12.06-3.4-18.32 c-0.5-10.4-0.58-13.55-0.58-39.87s0-29.47,0.58-39.87c0.05-6.26,1.2-12.46,3.4-18.32c3.33-8.58,10.11-15.36,18.69-18.69 c5.86-2.19,12.06-3.34,18.32-3.4C70.36,18.86,73.51,18.78,99.83,18.78 M99.83,1C73.05,1,69.7,1,59.17,1.58 c-8.19,0.17-16.29,1.72-23.96,4.6C21.85,11.27,11.29,21.83,6.2,35.19c-2.88,7.67-4.43,15.77-4.6,23.96 C1.14,69.68,1.02,73.03,1.02,99.81s0,30.13,0.58,40.66c0.17,8.19,1.72,16.29,4.6,23.96c5.09,13.37,15.65,23.92,29.01,29.01 c7.67,2.88,15.77,4.43,23.96,4.6c10.53,0.46,13.88,0.58,40.66,0.58s30.13,0,40.66-0.58c8.19-0.17,16.29-1.72,23.96-4.6 c13.37-5.09,23.92-15.65,29.01-29.01c2.88-7.67,4.43-15.77,4.6-23.96c0.46-10.53,0.58-13.88,0.58-40.66s0-30.13-0.58-40.66 c-0.17-8.19-1.72-16.29-4.6-23.96c-5.09-13.37-15.65-23.92-29.01-29.01c-7.67-2.88-15.77-4.43-23.96-4.6 C129.96,1.12,126.6,1,99.83,1z"
                    strokeWidth="0px"
                  ></path>
                  <path
                    fill="#eee"
                    d="M99.83,48.95c-27.97,0-50.65,22.68-50.65,50.65c0,27.97,22.68,50.65,50.65,50.65 c27.97,0,50.65-22.68,50.65-50.65l0,0C150.48,71.63,127.8,48.95,99.83,48.95z M99.83,132.47c-18.15,0-32.87-14.72-32.87-32.87 c0-18.15,14.72-32.87,32.87-32.87c18.15,0,32.87,14.72,32.87,32.87l0,0C132.7,117.75,117.98,132.47,99.83,132.47z"
                    strokeWidth="0px"
                  ></path>
                </svg>
                <a
                  className="flex-block__element--image-link"
                  href="https://www.instagram.com/janazuenkeler/"
                  aria-label="Instagram"
                  target="_self"
                ></a>
              </div>
              <div className="flex-block__element flex-block__element--element_id_58332671e6f2 flex-block__element--vector flex-block__element--block-blockID--46657">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <path
                    fill="#eee"
                    d="M176.66,65.76c0,44.78-25.04,78.21-61.56,78.21c-12.31,0-23.91-6.64-27.88-14.23c0,0-6.64,26.29-8.01,31.38 c-4.92,17.9-19.49,35.85-20.57,37.56c-0.58,0.63-1.55,0.67-2.18,0.09c-0.27-0.25-0.45-0.6-0.49-0.97 c-0.29-2.3-4.17-25.04,0.38-43.36c2.17-9.26,14.65-62.18,14.65-62.18c-2.47-5.7-3.71-11.86-3.63-18.07c0-16.9,9.81-29.5,21.99-29.5 c10.39,0,15.4,7.76,15.4,17.11c0,10.43-6.64,26.04-10.06,40.48c-2.41,9.45,3.3,19.06,12.74,21.47c1.71,0.44,3.48,0.61,5.24,0.53 c21.62,0,36.18-27.75,36.18-60.68c0-25.04-16.69-43.69-47.45-43.69c-34.64,0-56.21,25.79-56.21,54.63 c-0.33,8.13,2.36,16.1,7.55,22.37c1.88,1.54,2.54,4.13,1.63,6.39c-0.54,2.09-1.79,7.14-2.34,9.14c-0.53,2.24-2.77,3.64-5.01,3.11 c-0.24-0.06-0.48-0.13-0.7-0.23C30.43,108.74,23,91.3,23,71.68C23,39.26,50.33,0.4,104.55,0.4 C148.03,0.4,176.66,31.91,176.66,65.76z"
                    strokeWidth="0px"
                  ></path>
                </svg>
                <a
                  className="flex-block__element--image-link"
                  href="https://www.pinterest.de/janazuenkeler/"
                  aria-label="Pinterest"
                  target="_self"
                ></a>
              </div>
              <div className="flex-block__element flex-block__element--element_id_bbd78cb88305 flex-block__element--text flex-block__element--block-blockID--46657 flex-block__element--editorTagsFix">
                <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                  <p>
                    <span style={{ color: "var(--scheme_1--background--default)" }}>
                      <span className="has-inline-font" style={{ fontFamily: "Lato" }}>
                        © 2025 JANA VOGEL FOTOGRAFIE
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-block__element flex-block__element--element_id_51950 flex-block__element--shape flex-block__element--block-blockID--46657 flex-block__element--horizontal-line"></div>
              <div className="flex-block__element flex-block__element--element_id_a0d53852cab1 flex-block__element--text flex-block__element--block-blockID--46657 flex-block__element--editorTagsFix">
                <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                  <p>
                    <span style={{ color: "var(--scheme_1--background--default)" }}>
                      <Link prefetch={false} href="/datenschutz/">
                        DATENSCHUTZ
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-block__element flex-block__element--element_id_b71ea6c6694d flex-block__element--text flex-block__element--block-blockID--46657 flex-block__element--editorTagsFix">
                <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                  <p>
                    <span style={{ color: "var(--scheme_1--background--default)" }}>
                      <Link prefetch={false} href="/impressum/">
                        IMPRESSUM
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-block__element flex-block__element--element_id_0b744584b6b7 flex-block__element--text flex-block__element--block-blockID--46657 flex-block__element--editorTagsFix">
                <div data-font="7172010c80d0" className="flex-block__text-content height-auto">
                  <p>
                    <span style={{ color: "var(--scheme_1--background--default)" }}>
                      <a href="https://ycyoh.de" target="_blank" rel="noopener noreferrer">
                        WEBDESIGN BY YCYOH DESIGN
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
