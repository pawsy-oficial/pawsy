import userImage from '../../img/pexels-justin-shaifer-1222271.jpg';

export default function UserComments(){
  const User = ['Wagner Silva']
  return(
    <div className="flex items-center">
      <div className="w-10 h-10 flex rounded-full border-2 border-primary overflow-hidden">
          <img
              src={userImage}
              alt={userImage}
              className="object-cover w-full h-full"
          />
      </div>
    <p className="pl-2 text-base">{User[0]}</p>
</div>
  )
}