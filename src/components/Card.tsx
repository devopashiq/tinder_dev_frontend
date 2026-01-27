interface CardProps {
     icon: string;
     title: string;
     desc: string;
}

const Card = (cardItem : CardProps) => {
  return (
    <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">
    <div className=" card  w-auto shadow-sm bg-linear-to-br from-purple-900/20 to-pink-900/20">

  <div className="card-body text-left">
     <span className="text-6xl mb-4 transform group-hover:scale-110 transition-transform" >
  {cardItem.icon}
 </span>
    <h2 className="text-2xl font-bold mb-3">{cardItem.title}</h2>
    <p className="text-gray-400">{cardItem.desc}</p>
    
  </div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
</a>
  )
}

export default Card
