import './post.css'
import post1 from '../../img/post1.svg'
import pessoa from '../../img/person1.png'

export default function Post1() {
    return(
        <div className="container">
            <img
                src={post1} alt='post1'
            />
            <div className='pl-1 backopacity flex'>
                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                                    <img
                                        src={pessoa}
                                        alt={pessoa}
                                        className="object-cover w-full h-full"
                                    />
                 </div>
                <p className='pl-2 text-white font-semibold'>Thais Lima (tob)</p>
            </div>
    </div>
    );
}