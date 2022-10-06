<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    function index()
    {
        if (check('view student')) {
            $data = Student::get();
            return response($data);
        } else {
            return response("unauthorised to execute the request");
        }
    }

    function store(StudentRequest $request)
    {
        if (check('add student')) {
            Student::create([
                'name' => $request->name,
                'father_name' => $request->father_name,
                'mother_name' => $request->mother_name,
                'contact_no' => $request->contact_no,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
                'school' => $request->school,
                'standard' => $request->standard,
                'mark' => $request->mark
            ]);
            return response('store');
        } else {
            return response("unauthorised to execute the request");
        }
    }

    function show($id)
    {
        if (check('edit student')) {
            $data = Student::find($id);
            return response($data);
        } else {
            return response("unauthorised to execute the request");
        }
    }

    function update($id, StudentRequest $request)
    {
        if (check('edit student')) {
            Student::where('id', $id)->update([
                'name' => $request->name,
                'father_name' => $request->father_name,
                'mother_name' => $request->mother_name,
                'contact_no' => $request->contact_no,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
                'school' => $request->school,
                'standard' => $request->standard,
                'mark' => $request->mark
            ]);
            return response('updated');
        } else {
            return response("unauthorised to execute the request");
        }
    }

    function destroy($id)
    {
        if (check('delete student')) {
            Student::find($id)->delete();
            $data = Student::get();
            return response($data);
        } else {
            return response("unauthorised to execute the request");
        }
    }
}
