import React, { useState } from 'react';
import backgroundpc from './assets/bg.jpg';
import background from './assets/mobiledevices.jpg';
import logo1 from './assets/logo.png';

const EditProfile = () => {
    const [username, setUsername] = useState("tech_guru");
    const [firstName, setFirstName] = useState("Akshit");
    const [lastName, setLastName] = useState("Ohri");
    const [email, setEmail] = useState("avery@techie.com");
    const [bio, setBio] = useState("Hellooo !!");
    const [showProfilePic, setShowProfilePic] = useState(true);

    return (
        <div className="min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundpc})` }}>
            <div className="flex justify-center items-center min-h-screen z-10">
                <div className="container text-center items-center p-8 bg-opacity-60 backdrop-blur-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img src={logo1} alt="Logo" className="h-[10vh] w-[35vh] ml-[-3vh] mt-[-vh] mt-1" />
                            <i className="fas fa-bars text-2xl"></i>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-bell text-2xl ml-4"></i>
                            <button className="ml-4 backdrop-blur-lg text-white px-4 py-2 rounded-3xl hover:scale-110 transition duration-500 font-bold border">
                                Go Back
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <img
                            alt="Profile picture of user"
                            className="mx-auto rounded-full my-8 h-40 w-40"
                            src="https://storage.googleapis.com/a1aa/image/Nl2w51rrVhLUNt8N6Mjd8dDH05ejCWOI4SP5t2POBRdl0N0JA.jpg"
                        />
                        <h2 className="text-2xl font-bold mt-2 text-white">
                            {firstName} {lastName}
                            <i className="fas fa-check-circle text-blue-500"></i>
                        </h2>
                        <p className="text-gray-500">@{username}</p>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-white my-20 py-1">Edit Profile</h1>
                    <div className="mb-4">
                        <div>
                            <label className="block text-left mb-2 text-white font-bold">Username</label>
                            <input
                                className="bg-black text-gray-500 rounded-3xl py-3 px-5 w-full font-bold"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4 my-24 text-left">
                        <h2 className="text-xl font-bold mb-5 text-white">Privacy Settings</h2>
                        <div className="flex justify-between items-center py-10">
                            <div>
                                <p className="font-bold text-white">Show profile picture</p>
                                <p className="text-gray-500">Allow others to see your profile picture</p>
                            </div>
                            <div className="relative">
                                <div className="flex w-16 h-8 bg-gray-600 rounded-full">
                                    <span className={`h-8 w-8 bg-white rounded-full transform ${showProfilePic ? 'translate-x-8' : ''}`}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-white">Profile Information</h2>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 pr-2">
                                <label className="block text-left mb-2 text-white font-bold">First Name</label>
                                <input
                                    className="bg-black text-gray-500 rounded-3xl font-bold py-3 px-5 w-full"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <label className="block text-left mb-2 text-white font-bold">Last Name</label>
                                <input
                                    className="bg-black text-gray-500 rounded-3xl font-bold py-3 px-5 w-full"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-left mb-2 text-white font-bold">Email</label>
                            <input
                                className="bg-black text-gray-500 rounded-3xl py-3 px-5 w-full font-bold"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-left mb-2 text-white font-bold">Bio</label>
                            <textarea
                                className="bg-black text-gray-500 rounded-3xl py-3 px-5 w-full font-bold"
                                rows="4"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between text-white">
                        <button className="bg-gray-600 px-4 py-2 rounded-2xl">Cancel</button>
                        <button className="bg-green-600 px-4 py-2 rounded-2xl">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
