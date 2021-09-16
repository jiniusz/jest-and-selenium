### Integration tests will be fail

This is happening because we do not clear the database between runs. On each run, the integration tests will create the same tasks and clutter the DB. So when Selenium tries to find a specific task, it may find the old one and fail the test.

To fix this, we will create a *script*. A script is a file where each line is a command for the command prompt. On macOS/Linux systems, `.sh` files and BASH are used, whereas we will use `.bat` files on Windows.

> PowerShell can also be used on Windows, but I think it is overkill for this particular case.

If you are on **macOS/Linux**, create a file called `reset-db.sh` in project root with this content:

```
#!/bin/bash
rm -f ./db.json
cp ./db.json.bak ./db.json

```

If you are on **Windows**, create a file called `reset-db.bat` in project root with this content:

```
del db.json >nul 2>&1
echo f | xcopy db.json.bak db.json

```

Every time you run this script, it will delete the `db.json` file and restore a brand new one from the backup. This means you also need to create a backup. Create a file `db.json.bak` in project root with this content (the initial contents of `db.json`):

```
{
  "tasks": [
    {
      "id": 1,
      "label": "Do this",
      "completed": false
    }
  ]
}

```

Try running the script from the command line. Do you see the `db.json` file being restored? Change its contents or delete the file altogether to verify that the script is working.

To run this script automatically, we will modify the `scripts` section of the `package.json` file. Find the `integration-tests` entry and change it to (macOS/Linux):

```
"integration-tests": "reset-db.sh && jest integration-tests && reset-db.sh",

```

Windows:

```
"integration-tests": "reset-db.bat && jest integration-tests && reset-db.bat",

```

> There are many ways to achieve cross-platform config here, but they are out of the scope of this course.

Finally, once you have your `npm run json-server` and `npm start` commands running, you can run `npm run integration-tests` and witness all three integration tests passing! Congratulations, give yourself a pat on the back!

> There may be an issue with timeouts when you run the integration tests for the very first time. This is happening because JS compiler takes time to produce a build. To get around that, run the tests one more time or add this line to jest.config.bat:
