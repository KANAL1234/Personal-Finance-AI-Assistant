'use client';

import { useState } from 'react';
import api from '../lib/api';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

export default function Upload({ onUploadComplete }: { onUploadComplete: (text: string) => void }) {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setFileName(file.name);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/ocr/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUploadComplete(response.data.extracted_text);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-center">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,image/*"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {uploading ? (
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                ) : (
                    <UploadCloud className="w-10 h-10 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-600">
                    {uploading ? 'Processing...' : fileName ? fileName : 'Click to upload Bank Statement'}
                </span>
                <span className="text-xs text-gray-400">PDF or Images (JPEG/PNG)</span>
            </label>
        </div>
    );
}
