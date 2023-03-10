import { SVGProps } from 'react'

const Logo = (props: SVGProps<SVGSVGElement>) => (
  //   <svg
  //     viewBox="0 0 64 64"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     xmlnsXlink="http://www.w3.org/1999/xlink"
  //     {...props}
  //   >
  //     <g>
  //         <g>
  //             <polygon points="44,49 20,49 20,31 25,27 44,27" fill="#FFFFFF" />
  //         </g>
  //         <g>
  //             <rect height="6" fill="#3b82f6" width="2" x="25" y="18" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="25" y="14" />
  //         </g>
  //         <g>
  //             <rect height="6" fill="#3b82f6" width="2" x="29" y="18" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="29" y="14" />
  //         </g>
  //         <g>
  //             <rect height="6" fill="#3b82f6" width="2" x="37" y="18" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="37" y="14" />
  //         </g>
  //         <g>
  //             <rect height="6" fill="#3b82f6" width="2" x="33" y="18" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="33" y="14" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="13" y="43" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="9" y="43" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="13" y="39" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="9" y="39" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="13" y="31" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="9" y="31" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="13" y="35" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="9" y="35" />
  //         </g>
  //         <g>
  //             <rect height="7" fill="#3b82f6" width="2" x="37" y="52" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="37" y="61" />
  //         </g>
  //         <g>
  //             <rect height="7" fill="#3b82f6" width="2" x="33" y="52" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="33" y="61" />
  //         </g>
  //         <g>
  //             <rect height="7" fill="#3b82f6" width="2" x="25" y="52" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="25" y="61" />
  //         </g>
  //         <g>
  //             <rect height="7" fill="#3b82f6" width="2" x="29" y="52" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="29" y="61" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="47" y="31" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="53" y="31" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="47" y="35" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="53" y="35" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="47" y="43" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="53" y="43" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="4" x="47" y="39" />
  //         </g>
  //         <g>
  //             <rect height="2" fill="#3b82f6" width="2" x="53" y="39" />
  //         </g>
  //         <g>
  //             <path
  //                 d="M61.208,15.441L36.235,2.063c-2.596-1.391-5.875-1.391-8.471,0L2.792,15.441    C1.687,16.033,1,17.18,1,18.435v0.169C1,20.477,2.523,22,4.396,22c0.56,0,1.116-0.141,1.61-0.406L30.594,8.354    c0.861-0.464,1.951-0.464,2.812,0l24.588,13.239c0.494,0.266,1.05,0.406,1.61,0.406C61.477,22,63,20.477,63,18.604v-0.169    C63,17.18,62.313,16.033,61.208,15.441z M61,18.604C61,19.374,60.374,20,59.604,20c-0.23,0-0.458-0.058-0.662-0.167L34.354,6.594    C33.633,6.205,32.819,6,32,6s-1.633,0.205-2.354,0.594L5.058,19.833C4.854,19.942,4.626,20,4.396,20C3.626,20,3,19.374,3,18.604    v-0.169c0-0.516,0.282-0.987,0.737-1.23L28.709,3.826c2.018-1.08,4.564-1.08,6.582,0l24.972,13.378    C60.718,17.448,61,17.919,61,18.435V18.604z"
  //                 fill="#FFFFFF" />
  //             <polygon points="7,24 5,24 5,56 23,56 23,54 7,54   " fill="#FFFFFF" />
  //             <polygon points="57,54 41,54 41,56 59,56 59,24 57,24   " fill="#FFFFFF" />
  //             <path d="M45,26H24.649L19,30.52V50h26V26z M43,48H21V31.48L25.351,28H43V48z" fill="#3b82f6" />
  //         </g>
  //     </g>
  //   </svg>
  <svg
    // viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="121px" height="121px" viewBox="-0.5 -0.5 121 121"
    {...props}
  >
    <g>
      <path
        d="M 60 0 L 120 60 L 60 120 L 0 60 Z Z M 50 80 L 50 60 L 75 60 L 75 70 L 90 55 L 75 40 L 75 50 L 40 50 L 40 80 Z"
        fill="#000000"
        stroke="none"
      />
    </g>
  </svg>
)

export default Logo
