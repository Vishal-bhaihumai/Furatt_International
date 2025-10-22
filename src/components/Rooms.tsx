import React from "react";
import { useNavigate } from "react-router-dom";
import { BedDouble } from "lucide-react";
import { CORE_CONFIG } from "../config/constants";

function Rooms() {
  const navigate = useNavigate();

  const handleNavigate = (roomId: string) => {
    navigate(`/rooms#${roomId}`);
  };

  const roomTypes = CORE_CONFIG.accommodation.roomTypes;

  // ✅ Local mapping for images (without editing constants file)
  const roomImages: Record<string, string> = {
    classic: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    premium: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    executive: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    suite: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
  };

  const sectionBg = "bg-white";

  return (
    <section className={`py-20 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms</h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-10"></div>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Discover comfort crafted for every traveler — from cozy single rooms
          to elegant suites, each space offers warmth, style, and genuine hospitality.
        </p>

        {/* Dynamic Room Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="bg-amber-50 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={roomImages[room.id] || "/images/default-room.jpg"}
                alt={room.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-center mb-3">
                  <BedDouble className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 mb-4">{room.tagline}</p>
                <button
                  onClick={() => handleNavigate(room.id)}
                  className="bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;