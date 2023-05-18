'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from '@/components/Rating';
import { Project } from '../../../interfaces/Project';
import { useParams } from 'next/navigation';

import 'tailwindcss/tailwind.css';

export default function Index() {
	const params = useParams();
	const { id } = params;

	const [profileData, setProfileData] = useState<any>({});
	useEffect(() => {
		fetchProfileData(id);
	}, [id]);

	const fetchProfileData = async (id: string | number) => {
		try {
			const resutl = await axios.get(
				`https://joba-network-staging.herokuapp.com/api/auth/user/${id}`
			);
			if (resutl.status === 200) {
				setProfileData(resutl.data);
			}
		} catch (e) {
			console.log('api error', e);
		}
	};

	const renderProjectList = (project: Project) => (
		<li key={project.id} className='mb-8 flex items-start'>
			<span className='mr-2'>•</span>
			<div>
				<h4 className='text-lg font-bold'>{project.name}</h4>
				<p>
					<strong>Role:</strong> {project.role}
				</p>
				<p>
					<strong>Client Rating:</strong>{' '}
					<StarRating tooltips='Client Rating' value={3} />
				</p>
				<p>
					<strong>Worker Rating:</strong>{' '}
					<StarRating tooltips='Worker Rating' value={4} />
				</p>
				<p>
					<strong>Description:</strong> {project.description}
				</p>
				<p>
					<strong>Status:</strong> {project.status}
				</p>
			</div>
		</li>
	);

	console.log('profileData', profileData);

	const { user, projects } = profileData;
	return (
		<div className='container mx-auto p-4'>
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h1 className='text-2xl font-bold mb-4'>CV Profile</h1>
				<div className='flex'>
					<div className='w-1/4'>
						<Image
							src={user?.profile_photo}
							alt='Profile'
							width={200}
							height={200}
							className='rounded-circle cursor-pointer'
						/>
						<h2 className='text-lg font-bold'>{user?.display_name}</h2>
						<p className='text-gray-600'>{user?.email}</p>
						<p className='text-gray-600'>
							+{user?.phone?.country_code}
							{user?.phone?.number}
						</p>

						<p className='text-gray-600'>
							{user?.residential_address?.street_address}
							{user?.residential_address?.city}
							{user?.residential_address?.province}
							{user?.residential_address?.country}
						</p>
					</div>
					<div className='w-3/4 ml-8'>
						<h3 className='text-xl font-bold mb-2'>About Me</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
							vitae tortor at felis dignissim pulvinar. Nulla facilisi. Cras
							tincidunt nibh id enim rhoncus fermentum. Sed ut magna non odio
							sagittis facilisis.
						</p>

						<h3 className='text-xl font-bold mt-4 mb-2'>Experience</h3>
						<div>
							<h4 className='text-lg font-bold'>Projects</h4>
							<div className='grid grid-cols-2 gap-4'>
								{projects
									?.slice(0, Math.ceil(projects.length / 2))
									.map(renderProjectList)}
							</div>
							<div className='grid grid-cols-2 gap-4 mt-4'>
								{projects
									?.slice(Math.ceil(projects.length / 2))
									.map(renderProjectList)}
							</div>
						</div>
						<h3 className='text-xl font-bold mt-4 mb-2'>Education</h3>
						<div>
							<h4 className='text-lg font-bold'>Bachelor of Science</h4>
							<p className='text-gray-600'>University of Example</p>
							<p className='text-gray-600'>2015 - 2019</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
