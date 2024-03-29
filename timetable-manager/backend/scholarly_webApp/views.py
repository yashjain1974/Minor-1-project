from django.shortcuts import render
from rest_framework import viewsets

from .serializers import TodoSerializers
from .models import Todo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from scholarly import scholarly



# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class=TodoSerializers
    queryset=Todo.objects.all()
@api_view(['POST'])
def create_publication(request):
    serializer = TodoSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@api_view(['GET'])
def my_view(request, author_name):
   
    # search_query = 'Albert Einstein'
    # search_result = next(scholarly.search_author(search_query))

    # data = {
    #     'name': search_result["name"],
    #     'affiliation': search_result["affiliation"],
    #     'email': search_result["interests"],
    #     'citedby': search_result["citedby"],
    # }
    # print(data)
    search_query = scholarly.search_author(author_name)
    author = scholarly.fill(next(search_query))
    data=[]

    for pub in author['publications']:
        try:
            pub_year = pub['bib']['pub_year']
        
        except KeyError:
            pub_year = 'N/A'
            cited_url='N/A'
        try:
            
            cited_url= pub["citedby_url"]
        except KeyError:
            
            cited_url='N/A'
        try:
            
            pub_id= pub["author_pub_id"]
        except KeyError:
            
            pub_id='N/A'
        data.append({'title': pub['bib']['title'], 'pub_yr': pub_year, 'number_citations': pub['num_citations'],'citedby_url':cited_url,'pub_id':pub_id})
    data2=[{'name':author["name"],'total_citations':author["citedby"],"cites_per_year":author["cites_per_year"],'scholar_id': author['scholar_id'],'url_picture': author['url_picture'],
'affiliation': author['affiliation'],
 'interests':author['interests']}]
    final_data=[data,data2]
    

    return JsonResponse(final_data,safe=False)


