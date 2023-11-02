function CardPostsAds({ idClinic, imageURL, title, description, imageClinicURL, nameClinic,  }) {
    return (
        <div
            className="px-4 pt-2 pb-6 rounded-lg bg-white shadow-md max-w-[256px] w-full"
        >
            <div
                className="w-full h-40 overflow-hidden"
            >
                <img 
                    className="w-full h-full object-cover"
                    src={`${import.meta.env.VITE_URL}/files/${imageURL}`} 
                    alt={`asda`} 
                />
            </div>

            <strong>
                {title}
            </strong>
        </div>
    );
}

export default CardPostsAds;