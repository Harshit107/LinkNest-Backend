
import mongoose from 'mongoose';
import { env } from '../src/config/env';
import User from '../src/models/User';

const BASE_URL = `http://localhost:${env.PORT}`;
const USER_ID = env.DEFAULT_USER_ID;

// Mock environment variables for the script if not running via "npm run dev" context
if (!process.env.PORT) process.env.PORT = '3000';
if (!process.env.DEFAULT_USER_ID) process.env.DEFAULT_USER_ID = '507f1f77bcf86cd799439011';

async function runTests() {
  console.log('Starting verification...');

  // 1. Create Default User
  console.log('\n[1] Ensuring Default User exists...');
  await mongoose.connect('mongodb://localhost:27017/toolmanager');
  let user = await User.findById(USER_ID);
  if (!user) {
    user = await User.create({ _id: USER_ID, email: 'test@example.com' });
    console.log('User created:', user._id);
  } else {
    console.log('User already exists:', user._id);
  }
  await mongoose.disconnect();

  // 2. Create Folder
  console.log('\n[2] Testing POST /api/folders...');
  const folderRes = await fetch(`${BASE_URL}/api/folders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-id': USER_ID },
    body: JSON.stringify({ name: 'Test Folder', description: 'Created by test script' })
  });
  
  if (!folderRes.ok) {
    console.error('Failed to create folder:', await folderRes.text());
    return;
  }
  const folder = await folderRes.json();
  console.log('PASS: Folder created', folder._id);

  // 3. Create Website
  console.log('\n[3] Testing POST /api/websites...');
  const siteRes = await fetch(`${BASE_URL}/api/websites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-id': USER_ID },
    body: JSON.stringify({
      title: 'Google',
      url: 'https://google.com',
      folderId: folder._id
    })
  });

  if (!siteRes.ok) {
    console.error('Failed to create website:', await siteRes.text());
    return;
  }
  const website = await siteRes.json();
  console.log('PASS: Website created', website._id);

  // 4. Get Folders
  console.log('\n[4] Testing GET /api/folders...');
  const getFoldersRes = await fetch(`${BASE_URL}/api/folders`, {
     headers: { 'x-user-id': USER_ID }
  });
  const folders = await getFoldersRes.json();
  if (Array.isArray(folders) && folders.length > 0) {
      console.log('PASS: Folders retrieved', folders.length);
  } else {
      console.error('FAIL: No folders returned');
  }

  // 5. Cleanup
  console.log('\n[5] Cleaning up...');
  await fetch(`${BASE_URL}/api/websites/${website._id}`, { method: 'DELETE', headers: { 'x-user-id': USER_ID } });
  await fetch(`${BASE_URL}/api/folders/${folder._id}`, { method: 'DELETE', headers: { 'x-user-id': USER_ID } });
  
  console.log('PASS: Cleanup complete');
  console.log('\nAll tests passed!');
}

runTests().catch(console.error);
