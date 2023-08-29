import pessoa from '../../img/person1.png'

export default function PostBox({img,name}) {
    return (
        <div className="relative w-full h-[150px] rounded overflow-hidden">
            <img
                src={img} alt='post1'
                className='w-full h-full object-cover'
            />
            <div className='px-2 py-1 w-full flex absolute bottom-0 bg-black/80 items-center gap-1'>
                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                    <img
                        src={pessoa}
                        alt={pessoa}
                        className="object-cover w-full h-full"
                    />
                </div>
                <p className='pl-2 text-white font-semibold'>Jhon Lima ({name})</p>
            </div>
        </div>
    );
}