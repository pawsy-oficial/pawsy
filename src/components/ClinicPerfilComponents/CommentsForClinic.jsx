import UserComments from "./UserComments";

export function CommentsForClinic(){
  const comments = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]
  return(
    <div className="bg-primary/10 p-4 rounded-lg flex flex-col">
      <UserComments/>
      <span className="pt-2 text-sm">
        {comments[0]}
      </span>
    </div>
  )
}