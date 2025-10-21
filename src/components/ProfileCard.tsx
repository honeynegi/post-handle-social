'use client'

import { useState } from 'react'
import { createClient } from '../utils/supabase/client'
import Button from './Button'
import { useUser } from '../contexts/UserContext'

interface ProfileCardProps {
    user: any
}

export default function ProfileCard({ user }: ProfileCardProps) {
    const supabase = createClient()
    const { updateUser } = useUser()

    // Form states
    const [profileData, setProfileData] = useState({
        username: user?.user_metadata?.username || '',
        email: user?.email || '',
        bio: user?.user_metadata?.bio || '',
        website: user?.user_metadata?.website || ''
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    // Check if there are any changes to enable/disable the save button
    const hasChanges = () => {
        const originalData = {
            username: user?.user_metadata?.username || '',
            email: user?.email || '',
            bio: user?.user_metadata?.bio || '',
            website: user?.user_metadata?.website || ''
        }

        const dataChanged = JSON.stringify(profileData) !== JSON.stringify(originalData)
        const imageChanged = selectedImage !== null

        return dataChanged || imageChanged
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            // Create preview URL
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${user?.id}_${Date.now()}.${fileExt}`
            const filePath = `avatars/${fileName}`

            // First, ensure the avatars bucket exists
            const { data: buckets } = await supabase.storage.listBuckets()
            const avatarsBucket = buckets?.find(bucket => bucket.name === 'avatars')

            if (!avatarsBucket) {
                const { error: createError } = await supabase.storage.createBucket('avatars', {
                    public: true,
                    fileSizeLimit: 5 * 1024 * 1024, // 5MB
                    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
                })
                if (createError) {
                    console.error('Error creating bucket:', createError)
                    // If bucket creation fails, try to continue with upload anyway
                }
            }

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            return data.publicUrl
        } catch (error) {
            console.error('Error uploading image:', error)
            return null
        }
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)
        try {
            let avatarUrl = user?.user_metadata?.avatar_url

            // Upload image if selected
            if (selectedImage) {
                const uploadedUrl = await uploadImage(selectedImage)
                if (uploadedUrl) {
                    avatarUrl = uploadedUrl
                }
            }

            // Update user profile using the context method
            await updateUser({
                username: profileData.username,
                bio: profileData.bio,
                website: profileData.website,
                avatar_url: avatarUrl
            })

            // Clear selected image and preview
            setSelectedImage(null)
            setImagePreview(null)

            // Show success feedback with sliding animation
            setUpdateSuccess(true)
            setTimeout(() => setUpdateSuccess(false), 2000) // Reset after 2 seconds
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Error updating profile')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="relative p-6 rounded-lg shadow-sm w-full max-w-full bg-white overflow-hidden">
            {/* Sliding success indicator */}
            <div
                className={`absolute top-0 left-0 h-full bg-green-50 transition-transform duration-1000 ease-out ${
                    updateSuccess ? 'translate-x-full' : '-translate-x-full'
                }`}
                style={{ width: '100%' }}
            />
            {/* Uploading loader */}
            {isUploading && (
                <div className="flex items-center justify-center py-2 -m-6 w-full h-full bg-custom-secondary/10 backdrop-blur-md rounded-md absolute z-100">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-custom-secondary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-medium text-custom-secondary">Uploading...</span>
                </div>
            )}
            <h2 className="text-lg font-semibold text-gray-700 mb-4 relative z-10">Profile</h2>
            <div className="flex items-center gap-4 relative z-10">
                <div className="relative self-start ">
                    <img
                        src={imagePreview || user?.user_metadata?.avatar_url || "https://via.placeholder.com/40"}
                        alt="Profile Picture"
                        className="w-16 h-16 rounded-full object-cover cursor-pointer border-2 border-gray-300 hover:border-indigo-400 transition-colors"
                        onClick={() => document.getElementById('avatar-input')?.click()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('avatar-input')?.click()}>
                        <span className="text-white text-xs font-medium">Change</span>
                    </div>
                    <input
                        type="file"
                        id="avatar-input"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <div className='flex flex-row justify-start items-center gap-4'>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="displayName" className="block text-sm font-normal text-gray-400">Display Name</label>
                            <input
                                type="text"
                                id="displayName"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                            />
                            <p className="text-xs font-thin text-gray-400 mt-1">This name will be displayed across the platform</p>
                        </div>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={handleProfileUpdate}
                            type="submit"
                            className="self-center"
                            disabled={!hasChanges()}
                        >
                            Save
                        </Button>
                    </div>
                    <div className=''>
                        <label className="block text-sm font-normal text-gray-400">Email Address</label>
                        <p className="text-xs text-gray-900 mt-2">{profileData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}