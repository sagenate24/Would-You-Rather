// import React, { Component } from 'react';
// import { connect } from 'react-redux';

//  class Register extends Component {
//    state = {
//      name: '',
//      id: '',
//      fileupload: '',
//    }

//    handleSubmit = (e) => {
//      e.preventDefault();
//     console.log(e.target.value);
//    }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit} className='container-body'>
//           {/* <input
//             placeholder='name'
//             type='text'
//           />
//           <input
//             placeholder='id'
//             type='text'
//           /> */}
//           <input
//             placeholder='name'
//             type='file'
//             name='fileupload'
//             value='fileupload'
//             id='fileupload'
//           />
//           <label for='fileupload'>choose photo</label>
//           <button
//             type='submit'
//             // disabled={optionOneText === '' || optionTwoText === ''}
//             // className={optionOneText === '' || optionTwoText === '' ? 'button-not-active' : 'button'}
//           >Submit</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default connect()(Register);
