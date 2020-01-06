# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Shortcut methods for getting set up with Google Cloud Storage.

You'll typically use these to get started with the API:

>>> from google.cloud import storage
>>> client = storage.Client()
>>> bucket = client.get_bucket('bucket-id-here')
>>> # Then do other things...
>>> blob = bucket.get_blob('/remote/path/to/file.txt')
>>> print blob.download_as_string()
>>> blob.upload_from_string('New contents!')
>>> blob2 = bucket.blob('/remote/path/storage.txt')
>>> blob2.upload_from_filename(filename='/local/path.txt')

The main concepts with this API are:

- :class:`google.cloud.storage.connection.Connection` which represents a
  connection between your machine and the Cloud Storage API.

- :class:`google.cloud.storage.bucket.Bucket` which represents a particular
  bucket (akin to a mounted disk on a computer).

- :class:`google.cloud.storage.blob.Blob` which represents a pointer to a
  particular entity in Cloud Storage (akin to a file path on a remote
  machine).
"""

from google.cloud.storage.batch import Batch
from google.cloud.storage.blob import Blob
from google.cloud.storage.bucket import Bucket
from google.cloud.storage.client import Client
from google.cloud.storage.connection import Connection


SCOPE = Connection.SCOPE
