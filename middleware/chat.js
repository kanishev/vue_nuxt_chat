export default function({ store, redirect }) {
  if (!Object.keys(store.state.user).length) {
    console.log(1);
    redirect("/?message=userNotFound");
  }
}
