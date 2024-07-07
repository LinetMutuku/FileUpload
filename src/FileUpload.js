import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        // e.preventDefault();
        // const formData = new FormData();
        // if (Array.isArray(files)) {
        //     files.forEach(file => formData.append('files', file));
        // } else {
        //     console.error("Files is not an array:", files);
        //     return;
        // }
        formData.append('keyword', keyword);

        try {
            const response = await fetch('http://127.0.0.1:8000/batch_wc/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Upload Files</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleFileChange} />
                <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={handleKeywordChange}
                />
                <button type="submit">Upload</button>
            </form>
            <div>
                {results.map((result, index) => (
                    <p key={index}>
                        File: {result.file_name}, Lines: {result.lines}, Words: {result.words}, Bytes: {result.bytes}, Keyword Count: {result.keyword_count}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
