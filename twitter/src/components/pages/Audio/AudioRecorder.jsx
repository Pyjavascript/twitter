import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../context/firebase'; // Import the storage instance
import { useUserAuth } from '../../../context/userauth';

const AudioRecorder = () => {
    const { user } = useUserAuth();
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            setAudioBlob(blob);
        };

        mediaRecorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const uploadToFirebase = async () => {
        if (!audioBlob) {
            alert('Please record audio first!');
            return;
        }

        const fileRef = ref(storage, `voiceNotes/${user.email}-${Date.now()}.webm`);
        const snapshot = await uploadBytes(fileRef, audioBlob);

        const downloadUrl = await getDownloadURL(snapshot.ref);
        setFileUrl(downloadUrl);

        // Send URL to backend to save as post
        savePostToBackend(downloadUrl);
    };

    const savePostToBackend = async (downloadUrl) => {
        try {
            const response = await fetch('http://localhost:3000/api/save-audio-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, audioUrl: downloadUrl })
            });

            const data = await response.json();
            if (data.success) {
                alert('Audio post saved!');
            } else {
                alert('Failed to save post');
            }
        } catch (error) {
            console.error('Backend save error:', error);
            alert('Failed to save audio post');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Audio Recorder & Uploader</h2>
            <div className="my-4">
                {recording ? (
                    <button onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Stop Recording</button>
                ) : (
                    <button onClick={startRecording} className="bg-green-500 text-white p-2 rounded">Start Recording</button>
                )}
            </div>

            {audioBlob && (
                <div className="my-4">
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                    <button onClick={uploadToFirebase} className="bg-blue-500 text-white p-2 rounded mt-2">Upload Audio</button>
                </div>
            )}

            {fileUrl && (
                <div className="mt-4">
                    <p>Uploaded File URL:</p>
                    <a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-600">{fileUrl}</a>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
