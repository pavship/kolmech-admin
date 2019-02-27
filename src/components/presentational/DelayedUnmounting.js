// https://medium.com/@tomaszferens/delay-unmounting-of-the-component-in-react-8d6f6e73cdc

// function delayUnmounting(Component) {
//   return class extends React.Component {
//     state = {
//       shouldRender: this.props.isMounted
//     };

//     componentDidUpdate(prevProps) {
//       if (prevProps.isMounted && !this.props.isMounted) {
//         setTimeout(
//           () => this.setState({ shouldRender: false }),
//           this.props.delayTime
//         );
//       } else if (!prevProps.isMounted && this.props.isMounted) {
//         this.setState({ shouldRender: true });
//       }
//     }

//     render() {
//       return this.state.shouldRender ? <Component {...this.props} /> : null;
//     }
//   };
// }

// function Box(props) {
//   return (
//     <div>
//       ✨🎶✨🎶✨🎶✨🎶✨
//     </div>
//   )
// }

// const DelayedComponent = delayUnmounting(Box)

// class App extends React.Component {
//   state = {
//     isMounted: false
//   }

//   toggle = () => {
//     this.setState(state => ({ isMounted: !state.isMounted }))
//   }

//   render() {
//     return (
//       <div>
//         <DelayedComponent delayTime={500} isMounted={this.state.isMounted} />
//         <button onClick={this.toggle}>TOGGLE</button>
//       </div>
//     )
//   }
// }