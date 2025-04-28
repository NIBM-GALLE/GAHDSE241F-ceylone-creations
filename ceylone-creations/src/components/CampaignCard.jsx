import { Link } from 'react-router-dom';

export default function CampaignCard({ campaign }) {
  const progress = Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100);

  return (
    <Link to={`/campaign/${campaign.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative">
          <img 
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="p-5 flex-grow">
          <div className="flex items-center mb-3">
            <img 
              src={campaign.seller.avatar} 
              alt={campaign.seller.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{campaign.seller.name}</span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
            {campaign.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>
        </div>
        
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-indigo-600">
              ${campaign.currentAmount.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              {campaign.daysLeft} days left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}