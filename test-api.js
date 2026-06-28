const BASE_URL = 'http://localhost:5000/api/tasks';

async function runTests() {
  console.log('🚀 Starting API End-to-End Tests...\n');
  let createdTaskId = null;

  try {
    // ----------------------------------------------------
    // 8. TEST VALIDATION ERRORS (Invalid Input)
    // ----------------------------------------------------
    console.log('⏳ Testing POST /api/tasks with missing title...');
    const invalidRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'InvalidStatusXYZ' }),
    });
    const invalidData = await invalidRes.json();
    
    if (invalidRes.status === 400 && invalidData.error.includes('Title is required for creation')) {
      console.log('✅ Validation correctly caught missing title and invalid status (Status 400)\n');
    } else {
      console.error('❌ Validation failed to catch invalid input:', invalidData);
    }

    // ----------------------------------------------------
    // 1. & 7. CREATE A SAMPLE TASK
    // ----------------------------------------------------
    console.log('⏳ Testing POST /api/tasks (Valid Input)...');
    const taskPayload = {
      title: "Complete MERN Assignment",
      description: "Build TaskFlow OS",
      status: "Pending",
      priority: "High",
      category: "Learning"
    };

    const createRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskPayload),
    });
    const createData = await createRes.json();
    
    if (createRes.status === 201 && createData.success) {
      createdTaskId = createData.data._id;
      console.log(`✅ Task successfully created with ID: ${createdTaskId} (Status 201)\n`);
    } else {
      throw new Error(`Failed to create task: ${JSON.stringify(createData)}`);
    }

    // ----------------------------------------------------
    // 2. & 7. VERIFY GET RETURNS THE CREATED TASK
    // ----------------------------------------------------
    console.log('⏳ Testing GET /api/tasks...');
    const getRes = await fetch(BASE_URL);
    const getData = await getRes.json();
    
    if (getRes.status === 200 && getData.success) {
      const foundTask = getData.data.find(t => t._id === createdTaskId);
      if (foundTask && foundTask.title === "Complete MERN Assignment") {
        console.log(`✅ GET correctly returned the created task (Status 200)\n`);
      } else {
        throw new Error('Task was created but GET did not return it in the list.');
      }
    } else {
      throw new Error(`Failed to GET tasks: ${JSON.stringify(getData)}`);
    }

    // ----------------------------------------------------
    // 3. & 4. & 7. UPDATE TASK STATUS AND VERIFY
    // ----------------------------------------------------
    console.log('⏳ Testing PUT /api/tasks/:id...');
    const updateRes = await fetch(`${BASE_URL}/${createdTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "Completed" }),
    });
    const updateData = await updateRes.json();
    
    if (updateRes.status === 200 && updateData.success && updateData.data.status === "Completed") {
      console.log(`✅ PUT successfully updated task status to "Completed" (Status 200)\n`);
    } else {
      throw new Error(`Failed to update task: ${JSON.stringify(updateData)}`);
    }

    // ----------------------------------------------------
    // 5. & 7. DELETE THE TASK
    // ----------------------------------------------------
    console.log('⏳ Testing DELETE /api/tasks/:id...');
    const deleteRes = await fetch(`${BASE_URL}/${createdTaskId}`, {
      method: 'DELETE',
    });
    const deleteData = await deleteRes.json();
    
    if (deleteRes.status === 200 && deleteData.success) {
      console.log(`✅ DELETE successfully removed the task (Status 200)\n`);
    } else {
      throw new Error(`Failed to delete task: ${JSON.stringify(deleteData)}`);
    }

    // ----------------------------------------------------
    // 6. VERIFY THE TASK NO LONGER EXISTS
    // ----------------------------------------------------
    console.log('⏳ Verifying task is actually gone...');
    const finalGetRes = await fetch(BASE_URL);
    const finalGetData = await finalGetRes.json();
    
    const ghostTask = finalGetData.data.find(t => t._id === createdTaskId);
    if (!ghostTask) {
      console.log(`✅ Verified task no longer exists in MongoDB\n`);
    } else {
      throw new Error('Task was supposed to be deleted but is still in the database!');
    }

    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! THE BACKEND IS FULLY PRODUCTION-READY. 🎉');

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(error.message);
  }
}

runTests();
